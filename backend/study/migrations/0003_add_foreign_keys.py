# Generated migration to add foreign key fields to Study model

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('study', '0002_delete_all_models_create_study'),
        ('batch', '0004_chapter'),
        ('accounts', '0005_alter_customuser_mobile_number_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='study',
            name='batch',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.batch',
                verbose_name='Batch',
                null=True,
                blank=True
            ),
        ),
        migrations.AddField(
            model_name='study',
            name='subject',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.subject',
                verbose_name='Subject',
                null=True,
                blank=True
            ),
        ),
        migrations.AddField(
            model_name='study',
            name='chapter',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.chapter',
                verbose_name='Chapter',
                null=True,
                blank=True
            ),
        ),
        migrations.AddField(
            model_name='study',
            name='teacher',
            field=models.ForeignKey(
                limit_choices_to={'role': 'Teacher'},
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='accounts.customuser',
                verbose_name='Teacher',
                null=True,
                blank=True
            ),
        ),
        # Make fields required (since we have no existing data)
        migrations.AlterField(
            model_name='study',
            name='batch',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.batch',
                verbose_name='Batch',
            ),
        ),
        migrations.AlterField(
            model_name='study',
            name='subject',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.subject',
                verbose_name='Subject',
            ),
        ),
        migrations.AlterField(
            model_name='study',
            name='chapter',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='batch.chapter',
                verbose_name='Chapter',
            ),
        ),
        migrations.AlterField(
            model_name='study',
            name='teacher',
            field=models.ForeignKey(
                limit_choices_to={'role': 'Teacher'},
                on_delete=django.db.models.deletion.CASCADE,
                related_name='studies',
                to='accounts.customuser',
                verbose_name='Teacher',
            ),
        ),
    ]

