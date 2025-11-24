(function($) {
    'use strict';

    $(document).ready(function() {
        var courseCategoryField = $('#id_course_category');
        var batchField = $('#id_batch');
        var batchFieldContainer = batchField.closest('.form-row, .field-box');

        // Function to load batches based on course category
        function loadBatches(courseCategory) {
            if (!courseCategory) {
                // If no category selected, show all batches
                batchField.find('option').show();
                batchField.val('');
                return;
            }

            // Get the current batch value to preserve it if it matches the filter
            var currentBatchValue = batchField.val();

            // Fetch batches filtered by course category
            var url = '/admin/study/study/get-batches/';
            
            $.ajax({
                url: url,
                data: {
                    'course_category': courseCategory  // This will be the ID now
                },
                dataType: 'json',
                success: function(data) {
                    // Clear existing options except the empty one
                    batchField.find('option').not(':first').remove();

                    // Add filtered batches
                    $.each(data, function(index, batch) {
                        var option = $('<option></option>')
                            .attr('value', batch.id)
                            .text(batch.name);
                        batchField.append(option);
                    });

                    // Try to restore the previous selection if it's still in the filtered list
                    if (currentBatchValue && batchField.find('option[value="' + currentBatchValue + '"]').length) {
                        batchField.val(currentBatchValue);
                    } else {
                        batchField.val('');
                    }
                },
                error: function() {
                    console.error('Error loading batches');
                }
            });
        }

        // Handle course category change
        courseCategoryField.on('change', function() {
            var selectedCategory = $(this).val();
            loadBatches(selectedCategory);
        });

        // If course category is already selected on page load, filter batches
        if (courseCategoryField.val()) {
            loadBatches(courseCategoryField.val());
        }
    });
})(django.jQuery);

