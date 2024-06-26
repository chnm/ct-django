# Generated by Django 5.0.6 on 2024-05-09 15:56

import django.db.models.deletion
import modelcluster.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("exhibits", "0005_exhibithometag_exhibithome_tags"),
        ("wagtailimages", "0026_delete_uploadedimage"),
    ]

    operations = [
        migrations.CreateModel(
            name="ImageComparison",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "sort_order",
                    models.IntegerField(blank=True, editable=False, null=True),
                ),
                ("slider_value", models.IntegerField(default=50)),
                (
                    "first_image",
                    models.ForeignKey(
                        help_text="Exhibit landing page image",
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="+",
                        to="wagtailimages.image",
                    ),
                ),
                (
                    "page",
                    modelcluster.fields.ParentalKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="image_comparisons",
                        to="exhibits.exhibithome",
                    ),
                ),
                (
                    "second_image",
                    models.ForeignKey(
                        help_text="Exhibit landing page image",
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="+",
                        to="wagtailimages.image",
                    ),
                ),
            ],
            options={
                "ordering": ["sort_order"],
                "abstract": False,
            },
        ),
    ]
