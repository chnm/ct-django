# Generated by Django 5.0.6 on 2024-10-08 15:16

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0004_archive"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Archive",
        ),
        migrations.AddField(
            model_name="textilerecord",
            name="archive",
            field=models.CharField(blank=True, max_length=765, null=True),
        ),
    ]
