from django.db import models
from django.core.exceptions import ValidationError


class Study(models.Model):
    """Study model - represents study materials."""
    title = models.CharField('Title', max_length=200)
    
    # Foreign keys from batch app
    course_category = models.ForeignKey(
        'batch.CourseCategory',
        on_delete=models.CASCADE,
        related_name='studies',
        verbose_name='Course Category',
        blank=True,
        null=True,
        help_text='Select course category to filter batches'
    )
    batch = models.ForeignKey(
        'batch.Batch',
        on_delete=models.CASCADE,
        related_name='studies',
        verbose_name='Batch',
        help_text='Select the batch for this study material'
    )
    subject = models.ForeignKey(
        'batch.Subject',
        on_delete=models.CASCADE,
        related_name='studies',
        verbose_name='Subject',
        help_text='Select the subject for this study material'
    )
    chapter = models.ForeignKey(
        'batch.Chapter',
        on_delete=models.CASCADE,
        related_name='studies',
        verbose_name='Chapter',
        help_text='Select the chapter for this study material'
    )
    teacher = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.CASCADE,
        related_name='studies',
        verbose_name='Teacher',
        limit_choices_to={'role': 'Teacher'},
        help_text='Select the teacher for this study material'
    )
    # Uploads
    lecture_video = models.FileField(
        'Lecture Video', upload_to='studies/lectures/', null=True, blank=False,
        help_text='Upload lecture video file'
    )
    class_note = models.FileField(
        'Class Note', upload_to='studies/notes/', null=True, blank=False,
        help_text='Upload class notes (PDF or other)'
    )
    dpp_pdf = models.FileField(
        'DPP PDF', upload_to='studies/dpp/pdf/', null=True, blank=True,
        help_text='Upload DPP as PDF'
    )

    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Study'
        verbose_name_plural = 'Studies'

    def clean(self):
        """Validate that batch matches the selected course category."""
        errors = {}
        
        # Agar course_category select kiya hai, to batch bhi usi category ka hona chahiye
        if self.course_category and self.batch:
            # Batch ka course_category check karo
            if self.batch.course_category != self.course_category:
                errors['batch'] = (
                    f'Selected batch "{self.batch.name}" does not belong to '
                    f'course category "{self.course_category.name}". '
                    f'Please select a batch from {self.course_category.name} category.'
                )
        
        # Agar course_category select nahi kiya, lekin batch select kiya hai
        # To batch ke course_category ko automatically set kar do
        if not self.course_category and self.batch:
            self.course_category = self.batch.course_category
        
        if errors:
            raise ValidationError(errors)
    
    def save(self, *args, **kwargs):
        """Override save to run validation."""
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.batch.name})"
