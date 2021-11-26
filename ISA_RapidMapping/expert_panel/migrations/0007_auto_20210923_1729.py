# Generated by Django 3.2.7 on 2021-09-23 13:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('manager_panel', '0003_alter_manager_feedback_manager'),
        ('expert_panel', '0006_alter_expert_map_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expert_map',
            old_name='status',
            new_name='map_status',
        ),
        migrations.AlterField(
            model_name='expert_map',
            name='event',
            field=models.ForeignKey(blank=True, help_text='آیا این نقشه زیر مجموعه یک رخداد است؟', null=True, on_delete=django.db.models.deletion.SET_NULL, to='manager_panel.event'),
        ),
        migrations.AlterField(
            model_name='expert_map',
            name='expert',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]