document.addEventListener("DOMContentLoaded", function () {
    const courseCategory = document.getElementById("id_course_category");
    const batch = document.getElementById("id_batch");
    const subject = document.getElementById("id_subject");
    const chapter = document.getElementById("id_chapter");
    const teacher = document.getElementById("id_teacher");

    function setDisabled(el, disabled) {
        if (!el) return;
        el.disabled = !!disabled;
    }

    function clearSelect(el) {
        if (!el) return;
        el.innerHTML = '<option value="">---------</option>';
    }

    function loadOptions(url, target, labelKey = "name", valueKey = "id") {
        if (!target) return;
        setDisabled(target, true);
        target.innerHTML = '<option>Loading...</option>';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                target.innerHTML = '<option value="">---------</option>';
                data.forEach((item) => {
                    const opt = document.createElement("option");
                    opt.value = item[valueKey];
                    opt.textContent = item[labelKey] || item.name;
                    target.appendChild(opt);
                });
            })
            .catch((err) => {
                console.error("Error loading data:", err);
                target.innerHTML = '<option value="">Error loading</option>';
            })
            .finally(() => {
                setDisabled(target, false);
            });
    }

    // Course Category → Batches
    courseCategory?.addEventListener("change", function () {
        // Changing category invalidates batch/subject/chapter/teacher
        clearSelect(batch);
        clearSelect(subject);
        clearSelect(chapter);
        clearSelect(teacher);
        if (this.value) {
            loadOptions(`/admin/study/study/get-batches/?course_category=${this.value}`, batch);
        }
    });

    // Subject → Chapters + Teachers
    subject?.addEventListener("change", function () {
        // Changing subject invalidates chapter/teacher
        clearSelect(chapter);
        clearSelect(teacher);
        if (this.value) {
            loadOptions(`/admin/study/study/get-chapters/?subject=${this.value}`, chapter, "title");
            loadOptions(`/admin/study/study/get-teachers/?subject=${this.value}`, teacher, "name");
        }
    });

    // Initial population: only load if selects appear empty (common on add form)
    if (courseCategory && batch && batch.options.length <= 1 && courseCategory.value) {
        loadOptions(`/admin/study/study/get-batches/?course_category=${courseCategory.value}`, batch);
    }
    if (subject && chapter && chapter.options.length <= 1 && subject.value) {
        loadOptions(`/admin/study/study/get-chapters/?subject=${subject.value}`, chapter, "title");
    }
    if (subject && teacher && teacher.options.length <= 1 && subject.value) {
        loadOptions(`/admin/study/study/get-teachers/?subject=${subject.value}`, teacher, "name");
    }
});
