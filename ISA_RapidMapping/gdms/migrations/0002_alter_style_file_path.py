# Generated by Django 3.2.7 on 2021-09-19 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gdms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='style',
            name='file_path',
            field=models.FileField(blank=True, upload_to='geospatialFile/Styles/', verbose_name='فایل'),
        ),
    ]
