# Generated by Django 5.0.6 on 2024-06-11 20:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0012_alter_place_city_alter_place_country"),
    ]

    operations = [
        migrations.AlterField(
            model_name="textilerecord",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]