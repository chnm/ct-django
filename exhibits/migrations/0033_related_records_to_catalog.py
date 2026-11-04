import modelcluster.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    """Point exhibit sections at catalog items instead of material.TextileRecord.

    Remove and re-add rather than alter: the target's key changes from an integer
    to text (CT-00001). Links made under the old field are dropped; none existed
    when this was written (the field had not been released).
    """

    dependencies = [
        ("catalog", "0002_remove_source_item_ids_remove_source_n_items_and_more"),
        ("exhibits", "0032_exhibitpage_phase_related_records"),
    ]

    operations = [
        migrations.AlterField(
            model_name="exhibitpage",
            name="phase",
            field=models.CharField(
                blank=True,
                choices=[("pr", "Production"), ("td", "Trade & Distribution"), ("co", "Consumption")],
                help_text="Tints this section's eyebrow: Production, Trade & Distribution, or Consumption.",
                max_length=2,
            ),
        ),
        migrations.RemoveField(model_name="exhibitpage", name="related_records"),
        migrations.AddField(
            model_name="exhibitpage",
            name="related_records",
            field=modelcluster.fields.ParentalManyToManyField(
                blank=True,
                help_text="Database records to list under this section.",
                limit_choices_to={"is_public": True, "record_status": "published"},
                related_name="exhibit_sections",
                to="catalog.item",
            ),
        ),
    ]
