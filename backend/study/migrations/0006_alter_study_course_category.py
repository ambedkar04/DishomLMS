# Generated migration to change course_category from CharField to ForeignKey

from django.db import migrations, models
import django.db.models.deletion


def migrate_study_course_categories(apps, schema_editor):
    """Migrate existing Study course_category CharField to ForeignKey."""
    Study = apps.get_model('study', 'Study')
    CourseCategory = apps.get_model('batch', 'CourseCategory')
    
    # Use raw SQL to get old values and update new field
    from django.db import connection
    with connection.cursor() as cursor:
        # Get all studies with their old course_category values
        cursor.execute('SELECT id, course_category FROM study_study WHERE course_category IS NOT NULL AND course_category != ""')
        rows = cursor.fetchall()
        
        for study_id, old_value in rows:
            if old_value:
                try:
                    category = CourseCategory.objects.get(code=old_value)
                    # Update the study to use the new ForeignKey (temporary field)
                    Study.objects.filter(pk=study_id).update(course_category_new_id=category.id)
                except CourseCategory.DoesNotExist:
                    # If category not found, try to get from batch
                    try:
                        study = Study.objects.get(pk=study_id)
                        if study.batch and study.batch.course_category:
                            Study.objects.filter(pk=study_id).update(course_category_new_id=study.batch.course_category.id)
                    except:
                        pass


class Migration(migrations.Migration):

    dependencies = [
        ('study', '0005_add_course_category'),
        ('batch', '0005_coursecategory_alter_batch_course_category'),
    ]

    operations = [
        # Add temporary field for ForeignKey
        migrations.AddField(
            model_name='study',
            name='course_category_new',
            field=models.ForeignKey(
                null=True,
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies_temp',
                to='batch.coursecategory',
                verbose_name='Course Category (New)'
            ),
        ),
        # Migrate data
        migrations.RunPython(migrate_study_course_categories, migrations.RunPython.noop),
        # Remove old field
        migrations.RemoveField(
            model_name='study',
            name='course_category',
        ),
        # Rename new field
        migrations.RenameField(
            model_name='study',
            old_name='course_category_new',
            new_name='course_category',
        ),
        # Make it optional (blank=True, null=True)
        migrations.AlterField(
            model_name='study',
            name='course_category',
            field=models.ForeignKey(
                blank=True,
                help_text='Select course category to filter batches',
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.coursecategory',
                verbose_name='Course Category'
            ),
        ),
    ]

