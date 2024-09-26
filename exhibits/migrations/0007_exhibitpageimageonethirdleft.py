# Generated by Django 5.0.6 on 2024-09-24 19:35

import django.db.models.deletion
import wagtail.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0006_delete_exhibitpageimageonethirdleft"),
        ("wagtailcore", "0093_uploadedfile"),
        ("wagtailimages", "0026_delete_uploadedimage"),
    ]

    operations = [
        migrations.CreateModel(
            name="ExhibitPageImageOneThirdLeft",
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
                ("body", wagtail.fields.RichTextField(blank=True)),
                ("is_end_of_exhibit", models.BooleanField(default=False)),
                (
                    "image",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="+",
                        to="wagtailimages.image",
                    ),
                ),
                (
                    "link_to_next_page",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="+",
                        to="wagtailcore.page",
                    ),
                ),
                (
                    "link_to_previous_page",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="+",
                        to="wagtailcore.page",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
            bases=("wagtailcore.page",),
        ),
    ]