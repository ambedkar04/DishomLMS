# Generated manually to delete all old models and create Study model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('study', '0001_initial'),
    ]

    operations = [
        # Delete all old models first
        migrations.DeleteModel(
            name='DPPPDF',
        ),
        migrations.DeleteModel(
            name='DPP',
        ),
        migrations.DeleteModel(
            name='ClassNote',
        ),
        migrations.DeleteModel(
            name='Video',
        ),
        migrations.DeleteModel(
            name='Chapter',
        ),
        migrations.DeleteModel(
            name='Subject',
        ),
        migrations.DeleteModel(
            name='Batch',
        ),
        migrations.DeleteModel(
            name='CourseCategory',
        ),
        # Create the new Study model
        migrations.CreateModel(
            name='Study',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Title')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Study',
                'verbose_name_plural': 'Studies',
                'ordering': ['-created_at'],
            },
        ),
    ]

