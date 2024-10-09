# Generated by Django 5.0.6 on 2024-10-09 17:06

import django.db.models.deletion
import wagtail.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0029_exhibitpage_image_first_column_zoomable_and_more"),
        ("wagtailcore", "0093_uploadedfile"),
    ]

    operations = [
        migrations.CreateModel(
            name="GeneralPageThreeColumn",
            fields=[
                (
                    "page_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="wagtailcore.page",
                    ),
                ),
                (
                    "column_one",
                    wagtail.fields.RichTextField(
                        blank=True, help_text="Column one content."
                    ),
                ),
                (
                    "column_two",
                    wagtail.fields.RichTextField(
                        blank=True, help_text="Column two content."
                    ),
                ),
                (
                    "column_three",
                    wagtail.fields.RichTextField(
                        blank=True, help_text="Column three content."
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
            bases=("wagtailcore.page",),
        ),
    ]
