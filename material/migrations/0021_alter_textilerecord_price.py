# Generated by Django 5.0.6 on 2024-07-09 14:44

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0020_alter_textilerecord_keywords"),
    ]

    operations = [
        migrations.AlterField(
            model_name="textilerecord",
            name="price",
            field=models.TextField(blank=True, null=True),
        ),
    ]