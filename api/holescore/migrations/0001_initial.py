# Generated by Django 4.1.5 on 2023-01-25 11:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('holeinfo', '0001_initial'),
        ('round', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HoleScore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.PositiveSmallIntegerField()),
                ('hole', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='holeinfo.holeinfo')),
                ('round', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='holes', to='round.round')),
            ],
        ),
    ]
