# Generated by Django 5.0.6 on 2024-10-08 17:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0005_delete_archive_textilerecord_archive"),
    ]

    operations = [
        migrations.AlterField(
            model_name="textilerecord",
            name="year",
            field=models.CharField(blank=True, null=True),
        ),
    ]