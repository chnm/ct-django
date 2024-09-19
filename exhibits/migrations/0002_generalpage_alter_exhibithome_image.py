# Generated by Django 5.0.6 on 2024-09-19 15:50

import django.db.models.deletion
import wagtail.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0001_initial"),
        ("wagtailcore", "0093_uploadedfile"),
        ("wagtailimages", "0026_delete_uploadedimage"),
    ]

    operations = [
        migrations.CreateModel(
            name="GeneralPage",
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
                    "body",
                    wagtail.fields.RichTextField(
                        blank=True, help_text="General site pages."
                    ),
                ),
                (
                    "sidebar",
                    wagtail.fields.RichTextField(
                        blank=True, help_text="Sidebar content for the page."
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
            bases=("wagtailcore.page",),
        ),
        migrations.AlterField(
            model_name="exhibithome",
            name="image",
            field=models.ForeignKey(
                help_text="Exhibit landing page with full screen image",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="wagtailimages.image",
            ),
        ),
    ]