# Generated by Django 5.0.6 on 2024-07-10 13:46

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0024_alter_subject_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="subject",
            name="name",
            field=models.CharField(max_length=350, null=True, unique=True),
        ),
    ]
