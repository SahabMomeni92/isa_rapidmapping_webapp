# Generated by Django 3.2.7 on 2021-11-04 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gdms', '0008_auto_20210923_1235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workspace',
            name='name',
            field=models.CharField(max_length=100, unique=True, verbose_name='نام'),
        ),
    ]
