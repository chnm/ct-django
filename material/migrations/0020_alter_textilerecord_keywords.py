# Generated by Django 5.0.6 on 2024-07-09 14:43

import taggit.managers
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("material", "0019_alter_textilealias_options_and_more"),
        (
            "taggit",
            "0006_rename_taggeditem_content_type_object_id_taggit_tagg_content_8fc721_idx",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="textilerecord",
            name="keywords",
            field=taggit.managers.TaggableManager(
                blank=True,
                help_text="A comma-separated list of tags.",
                through="taggit.TaggedItem",
                to="taggit.Tag",
                verbose_name="Tags",
            ),
        ),
    ]
