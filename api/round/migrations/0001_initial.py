# Generated by Django 4.1.5 on 2023-01-22 23:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Round',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(verbose_name='date')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rounds', to='course.course')),
                ('golfer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rounds', to=settings.AUTH_USER_MODEL)),
                ('tee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rounds', to='tee.tee')),
            ],
        ),
    ]