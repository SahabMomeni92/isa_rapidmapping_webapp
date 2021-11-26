# Generated by Django 3.2.6 on 2021-09-05 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccounts',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='useraccounts',
            name='is_topmanager',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='useraccounts',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]