# Generated by Django 5.0.6 on 2024-06-11 18:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0002_alter_textilerecord_associated_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="textilerecord",
            name="primary_subjects",
            field=models.ManyToManyField(
                blank=True,
                related_name="primary_subject_records",
                to="material.subject",
            ),
        ),
        migrations.AlterField(
            model_name="textilerecord",
            name="secondary_subjects",
            field=models.ManyToManyField(
                blank=True,
                related_name="secondary_subject_records",
                to="material.subject",
            ),
        ),
    ]
