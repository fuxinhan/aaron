# Generated by Django 2.1.3 on 2018-11-24 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Resources', '0011_lives_long_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='lives',
            name='tab',
            field=models.BooleanField(default=False),
        ),
    ]
