# Generated by Django 3.2.7 on 2021-09-25 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210905_2257'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccounts',
            name='is_active',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_expert',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_manager',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_staff',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_superuser',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_topmanager',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
