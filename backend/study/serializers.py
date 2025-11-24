from rest_framework import serializers
from .models import Study


class StudySerializer(serializers.ModelSerializer):
    """Serializer for Study model."""
    # Read-only fields to show related data
    course_category_name = serializers.CharField(source='course_category.name', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    chapter_title = serializers.CharField(source='chapter.title', read_only=True)
    teacher_name = serializers.CharField(source='teacher.get_full_name', read_only=True)
    
    class Meta:
        model = Study
        fields = [
            'id', 'title',
            'course_category', 'course_category_name',
            'batch',
            'subject', 'subject_name',
            'chapter', 'chapter_title',
            'teacher', 'teacher_name',
            'lecture_video', 'class_note', 'dpp_pdf',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'course_category_name', 'subject_name', 'chapter_title', 'teacher_name']

    def validate(self, attrs):
        """Cross-field validation for data integrity."""
        # Use instance values if fields not present in partial updates
        batch = attrs.get('batch') or getattr(self.instance, 'batch', None)
        subject = attrs.get('subject') or getattr(self.instance, 'subject', None)
        chapter = attrs.get('chapter') or getattr(self.instance, 'chapter', None)
        teacher = attrs.get('teacher') or getattr(self.instance, 'teacher', None)
        course_category = attrs.get('course_category') or getattr(self.instance, 'course_category', None)

        errors = {}

        # Ensure teacher has Teacher role
        if teacher and getattr(teacher, 'role', None) != 'Teacher':
            errors['teacher'] = 'Selected user must have role Teacher.'

        # Ensure chapter belongs to subject
        if chapter and subject and chapter.subject_id != subject.id:
            errors['chapter'] = 'Selected chapter does not belong to the selected subject.'

        # Ensure subject exists within batch.subjects
        if batch and subject and not batch.subjects.filter(id=subject.id).exists():
            errors['subject'] = 'Selected subject is not part of the selected batch.'

        # Ensure course_category matches batch; if not provided, set it from batch
        if batch:
            if course_category is None:
                attrs['course_category'] = batch.course_category
            elif course_category.id != batch.course_category_id:
                errors['course_category'] = 'Course category must match the selected batch.'

        if errors:
            raise serializers.ValidationError(errors)

        return attrs
