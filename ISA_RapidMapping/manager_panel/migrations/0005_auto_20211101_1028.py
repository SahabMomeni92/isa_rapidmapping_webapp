# Generated by Django 3.2.7 on 2021-11-01 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager_panel', '0004_event_workspace'),
    ]

    operations = [
        migrations.RenameField(
            model_name='disaster',
            old_name='fa_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='disaster',
            old_name='en_name',
            new_name='workspace',
        ),
        migrations.AlterField(
            model_name='disaster',
            name='abbreviation',
            field=models.CharField(max_length=50, unique=True, verbose_name='نام مخفف'),
        ),
    ]
