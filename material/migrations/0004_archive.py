# Generated by Django 5.0.6 on 2024-10-08 13:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0003_textilerecord_creator_alter_textilerecord_is_public"),
    ]

    operations = [
        migrations.CreateModel(
            name="Archive",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=765, unique=True)),
            ],
            options={
                "verbose_name_plural": "Archives",
            },
        ),
    ]
