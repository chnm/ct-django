# Generated by Django 5.0.6 on 2024-06-11 20:27

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0008_alter_place_city_alter_place_country_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="place",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
