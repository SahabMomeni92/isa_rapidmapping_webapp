# Generated by Django 3.2.5 on 2021-07-23 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expert_panel', '0004_auto_20210723_1147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expert_map',
            name='status',
            field=models.CharField(choices=[('P', 'در حال بررسی'), ('C', 'نیاز به اصلاحات دارد')], default='P', max_length=1, verbose_name='وضعیت'),
        ),
    ]
