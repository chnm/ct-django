# Generated by Django 5.0.6 on 2024-09-24 19:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0007_exhibitpageimageonethirdleft"),
        ("wagtailimages", "0026_delete_uploadedimage"),
    ]

    operations = [
        migrations.AlterField(
            model_name="exhibitpageimageonethirdleft",
            name="image",
            field=models.ForeignKey(
                help_text="Exhibit page with one-third screen image on left",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="wagtailimages.image",
            ),
        ),
    ]
