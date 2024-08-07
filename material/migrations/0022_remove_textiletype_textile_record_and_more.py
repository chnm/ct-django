# Generated by Django 5.0.6 on 2024-07-10 13:02

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0021_alter_textilerecord_price"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="textiletype",
            name="textile_record",
        ),
        migrations.AddField(
            model_name="textilerecord",
            name="textile_types",
            field=models.ManyToManyField(
                blank=True, related_name="textile_records", to="material.textiletype"
            ),
        ),
    ]
