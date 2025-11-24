from django.contrib import admin
from django.utils.html import format_html
from django import forms
from django.urls import path
from django.http import JsonResponse
from .models import Study


class StudyAdminForm(forms.ModelForm):
    """Custom form for Study admin with dependent dropdowns."""
    class Meta:
        model = Study
        fields = '__all__'
        widgets = {
            'course_category': forms.Select(attrs={'id': 'id_course_category'}),
            'batch': forms.Select(attrs={'id': 'id_batch'}),
            'subject': forms.Select(attrs={'id': 'id_subject'}),
            'chapter': forms.Select(attrs={'id': 'id_chapter'}),
            'teacher': forms.Select(attrs={'id': 'id_teacher'}),
        }


@admin.register(Study)
class StudyAdmin(admin.ModelAdmin):
    form = StudyAdminForm
    list_display = (
        'title', 'course', 'batch', 'subject', 'chapter', 'teacher', 
        'has_video', 'has_notes', 'has_dpp',
        'created_at',
    )
    readonly_fields = ('created_at', 'updated_at')

    class Media:
        js = ('study/js/study_admin.js',)  # use your app-level static path

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('get-batches/', self.admin_site.admin_view(self.get_batches)),
            path('get-chapters/', self.admin_site.admin_view(self.get_chapters)),
            path('get-teachers/', self.admin_site.admin_view(self.get_teachers)),
        ]
        return custom_urls + urls

    # ---------- AJAX API Views ----------
    def get_batches(self, request):
        course_category_id = request.GET.get('course_category')
        if course_category_id:
            from batch.models import Batch
            batches = Batch.objects.filter(course_category_id=course_category_id).values('id', 'name')
            return JsonResponse(list(batches), safe=False)
        return JsonResponse([], safe=False)

    def get_chapters(self, request):
        subject_id = request.GET.get('subject')
        if subject_id:
            from batch.models import Chapter
            chapters = Chapter.objects.filter(subject_id=subject_id).values('id', 'title')
            return JsonResponse(list(chapters), safe=False)
        return JsonResponse([], safe=False)

    def get_teachers(self, request):
        subject_id = request.GET.get('subject')
        if subject_id:
            from accounts.models import CustomUser
            teachers = CustomUser.objects.filter(subjects__id=subject_id).values('id', 'first_name', 'last_name', 'full_name')
            data = [
                {'id': t['id'], 'name': t['full_name'] or f"{t['first_name']} {t['last_name']}".strip()}
                for t in teachers
            ]
            return JsonResponse(data, safe=False)
        return JsonResponse([], safe=False)

    # ---------- Display Methods ----------
    def batch_display(self, obj):
        if obj.batch:
            # Take only the part before the first '['
            batch_name = obj.batch.name.split('[', 1)[0].strip()
            return format_html('<a href="/admin/batch/batch/{}/change/">{}</a>', obj.batch.id, batch_name)
        return '-'

    def course_category_display(self, obj):
        return obj.course_category.name if obj.course_category else '-'

    def course(self, obj):
        return obj.course_category

    course.short_description = "Course"

    def subject_display(self, obj):
        if obj.subject:
            return format_html('<a href="/admin/batch/subject/{}/change/">{}</a>', obj.subject.id, obj.subject.name)
        return '-'

    def chapter_display(self, obj):
        if obj.chapter:
            return format_html('<a href="/admin/batch/chapter/{}/change/">{}</a>', obj.chapter.id, obj.chapter.title)
        return '-'

    def teacher_display(self, obj):
        if obj.teacher:
            # Get the teacher's full name or mobile number
            teacher_name = obj.teacher.get_full_name() or obj.teacher.mobile_number
            # Remove anything in parentheses
            teacher_name = teacher_name.split('(')[0].strip()
            return format_html('<a href="/admin/accounts/customuser/{}/change/">{}</a>',
                             obj.teacher.id, teacher_name)
        return '-'

    def has_video(self, obj):
        return bool(obj.lecture_video)
    has_video.boolean = True
    has_video.short_description = 'Video'

    def has_notes(self, obj):
        return bool(obj.class_note)
    has_notes.boolean = True
    has_notes.short_description = 'Notes'

    def has_dpp(self, obj):
        return bool(obj.dpp_pdf)
    has_dpp.boolean = True
    has_dpp.short_description = 'DPP'
