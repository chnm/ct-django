# Generated by Django 5.0.6 on 2024-10-01 15:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exhibits", "0023_delete_exhibithomeindex"),
    ]

    operations = [
        migrations.AddField(
            model_name="exhibitpage",
            name="display_title",
            field=models.BooleanField(
                default=True,
                help_text="Display the title on the page or not. Checked means yes.",
            ),
        ),
        migrations.AlterField(
            model_name="exhibitpage",
            name="layout",
            field=models.CharField(
                choices=[
                    ("left_image_one_third", "Left Image, One Third"),
                    ("right_image_one_third", "Right Image, One Third"),
                    ("left_image_two_thirds", "Left Image, Two Thirds"),
                    ("right_image_two_thirds", "Right Image, Two Thirds"),
                    ("half_and_half", "Half and Half"),
                    ("full_screen", "Full Screen"),
                    ("wide_image", "Wide Image"),
                ],
                default="left_image_one_third",
                help_text="Select the layout for this exhibit page.",
                max_length=22,
            ),
        ),
    ]