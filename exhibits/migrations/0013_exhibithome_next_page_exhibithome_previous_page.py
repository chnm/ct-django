# Generated by Django 5.0.6 on 2024-09-25 16:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0012_exhibithome_citation_text"),
        ("wagtailcore", "0093_uploadedfile"),
    ]

    operations = [
        migrations.AddField(
            model_name="exhibithome",
            name="next_page",
            field=models.ForeignKey(
                blank=True,
                help_text="Link to the next page in the exhibit.",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="wagtailcore.page",
            ),
        ),
        migrations.AddField(
            model_name="exhibithome",
            name="previous_page",
            field=models.ForeignKey(
                blank=True,
                help_text="Link to the previous page in the exhibit.",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to="wagtailcore.page",
            ),
        ),
    ]
