# Generated by Django 3.2.5 on 2021-07-22 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expert_panel', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expert_map',
            name='date',
            field=models.DateTimeField(verbose_name='تاریخ حادثه'),
        ),
    ]
