from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_customgroup'),
    ]

    operations = [
        migrations.RunSQL(
            """
            ALTER TABLE accounts_customuser ADD COLUMN IF NOT EXISTS first_name varchar(150) NOT NULL DEFAULT '';
            ALTER TABLE accounts_customuser ADD COLUMN IF NOT EXISTS last_name varchar(150) NOT NULL DEFAULT '';
            """,
            reverse_sql="""
            ALTER TABLE accounts_customuser DROP COLUMN IF EXISTS first_name;
            ALTER TABLE accounts_customuser DROP COLUMN IF EXISTS last_name;
            """
        )
    ]
