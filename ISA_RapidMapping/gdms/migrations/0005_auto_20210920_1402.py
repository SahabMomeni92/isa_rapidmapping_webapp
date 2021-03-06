# Generated by Django 3.2.7 on 2021-09-20 09:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gdms', '0004_alter_geospatialfile_style'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='geospatialfile',
            name='style',
        ),
        migrations.AlterField(
            model_name='geospatialfile',
            name='file_type',
            field=models.CharField(max_length=30),
        ),
        migrations.CreateModel(
            name='Layers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='نام فایل')),
                ('system_name', models.CharField(max_length=30, unique=True, verbose_name='نام سیستمی')),
                ('description', models.CharField(blank=True, max_length=255, verbose_name='توضیحات')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('geospatialfile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gdms.geospatialfile', verbose_name='فایل مکانی')),
                ('style', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gdms.style', verbose_name='استایل')),
            ],
        ),
    ]
