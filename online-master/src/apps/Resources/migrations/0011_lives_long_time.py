# Generated by Django 2.1.3 on 2018-11-23 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Resources', '0010_auto_20181122_1731'),
    ]

    operations = [
        migrations.AddField(
            model_name='lives',
            name='long_time',
            field=models.IntegerField(null=True),
        ),
    ]
