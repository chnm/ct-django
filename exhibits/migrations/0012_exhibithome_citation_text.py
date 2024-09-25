# Generated by Django 5.0.6 on 2024-09-25 16:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0011_exhibitpagehalfandhalf"),
    ]

    operations = [
        migrations.AddField(
            model_name="exhibithome",
            name="citation_text",
            field=models.TextField(
                blank=True,
                help_text="Citation information for the exhibit.",
                verbose_name="Citation",
            ),
        ),
    ]
