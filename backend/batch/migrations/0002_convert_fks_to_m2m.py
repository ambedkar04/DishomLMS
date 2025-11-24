from django.db import migrations, models
from django.conf import settings


def forwards(apps, schema_editor):
    Batch = apps.get_model('batch', 'Batch')
    # iterate existing rows and copy FK values into new M2M tables
    for batch in Batch.objects.all():
        # copy teacher FK -> teachers M2M
        teacher_id = getattr(batch, 'teacher_id', None)
        if teacher_id:
            try:
                batch.teachers.add(teacher_id)
            except Exception:
                # If for some reason add fails (permissions, constraints), skip
                pass
        # copy subject FK -> subjects M2M
        subject_id = getattr(batch, 'subject_id', None)
        if subject_id:
            try:
                batch.subjects.add(subject_id)
            except Exception:
                pass


def backwards(apps, schema_editor):
    Batch = apps.get_model('batch', 'Batch')
    # On reverse, copy the first M2M entry back into FK fields (if present)
    for batch in Batch.objects.all():
        # teachers -> teacher FK
        try:
            teachers = list(batch.teachers.all())
            if teachers:
                batch.teacher_id = teachers[0].pk
            else:
                batch.teacher_id = None
        except Exception:
            pass
        # subjects -> subject FK
        try:
            subjects = list(batch.subjects.all())
            if subjects:
                batch.subject_id = subjects[0].pk
            else:
                batch.subject_id = None
        except Exception:
            pass
        batch.save()


class Migration(migrations.Migration):

    dependencies = [
        ('batch', '0001_initial'),
    ]

    operations = [
        # Add new ManyToMany fields (allow blank while migrating data)
        migrations.AddField(
            model_name='batch',
            name='teachers',
            field=models.ManyToManyField(blank=True, help_text='Select 1-10 teachers for this batch', related_name='teaching_batches', to=settings.AUTH_USER_MODEL, verbose_name='Teachers'),
        ),
        migrations.AddField(
            model_name='batch',
            name='subjects',
            field=models.ManyToManyField(blank=True, help_text='Select 1-10 subjects for this batch', related_name='batches', to='batch.Subject', verbose_name='Subjects'),
        ),
        # Copy existing FK data into M2M tables
        migrations.RunPython(forwards, backwards),
        # Remove old FK fields after data copied
        migrations.RemoveField(
            model_name='batch',
            name='teacher',
        ),
        migrations.RemoveField(
            model_name='batch',
            name='subject',
        ),
    ]
