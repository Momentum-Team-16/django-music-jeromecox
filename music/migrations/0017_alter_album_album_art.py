# Generated by Django 4.1.5 on 2023-01-13 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0016_alter_album_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='album_art',
            field=models.URLField(blank=True, null=True),
        ),
    ]
