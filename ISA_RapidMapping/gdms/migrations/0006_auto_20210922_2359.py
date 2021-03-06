# Generated by Django 3.2.7 on 2021-09-22 20:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gdms', '0005_auto_20210920_1402'),
    ]

    operations = [
        migrations.AddField(
            model_name='geospatialfile',
            name='is_on_geoserver',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AddField(
            model_name='geospatialfile',
            name='style',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gdms.style', verbose_name='استایل'),
        ),
        migrations.DeleteModel(
            name='Layers',
        ),
    ]
