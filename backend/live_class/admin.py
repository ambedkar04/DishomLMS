from django.contrib import admin
from .models import YTClass, LiveClass

@admin.register(YTClass)
class YTClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'class_type', 'course_display', 'batch', 'subject_display', 'chapter_display', 'teacher_display')
    list_filter = ('batch', 'course_category', 'subject', 'teacher')

    readonly_fields = ('iframe_preview',)
    
    # Horizontal tabs: Batch Info then Class Info
    fieldsets = (
        ('Batch Info', {
            'fields': ('course_category', 'batch', 'subject', 'chapter', 'teacher'),
            'classes': ('tab',),
        }),
        ('Class Info', {
            'fields': ('title', 'youtube_url', 'is_active', 'iframe_preview'),
            'classes': ('tab',),
        }),
    )

    def class_type(self, obj):
        return "YouTube"
    class_type.short_description = "Type"

    def course_display(self, obj):
        return obj.course_category.name if obj.course_category else "-"
    course_display.short_description = "Course"

    def subject_display(self, obj):
        return obj.subject.name if obj.subject else "-"
    subject_display.short_description = "Subject"

    def chapter_display(self, obj):
        return str(obj.chapter) if obj.chapter else "-"
    chapter_display.short_description = "Chapter"

    def teacher_display(self, obj):
        return obj.teacher.get_full_name() or obj.teacher.username if obj.teacher else "-"
    teacher_display.short_description = "Teacher"

    def iframe_preview(self, obj):
        return obj.get_iframe()
    iframe_preview.short_description = "Video Preview"

@admin.register(LiveClass)
class LiveClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'class_type', 'course_display', 'batch', 'subject_display', 'chapter_display', 'teacher_display')
    list_filter = ('batch', 'course_category', 'subject', 'teacher')
    
    # Horizontal tabs: Batch Info then Class Info
    fieldsets = (
        ('Batch Info', {
            'fields': ('course_category', 'batch', 'subject', 'chapter', 'teacher'),
            'classes': ('tab',),
        }),
        ('Class Info', {
            'fields': ('title', 'meeting_id', 'is_active'),
            'classes': ('tab',),
        }),
    )

    def class_type(self, obj):
        return "Live"
    class_type.short_description = "Type"

    def course_display(self, obj):
        return obj.course_category.name if obj.course_category else "-"
    course_display.short_description = "Course"

    def subject_display(self, obj):
        return obj.subject.name if obj.subject else "-"
    subject_display.short_description = "Subject"

    def chapter_display(self, obj):
        return str(obj.chapter) if obj.chapter else "-"
    chapter_display.short_description = "Chapter"

    def teacher_display(self, obj):
        return obj.teacher.get_full_name() or obj.teacher.username if obj.teacher else "-"
    teacher_display.short_description = "Teacher"