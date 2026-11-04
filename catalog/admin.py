from django import forms
from django.contrib import admin, messages
from django.db import models
from django.shortcuts import redirect
from django.urls import path
from reversion.admin import VersionAdmin
from unfold.admin import ModelAdmin, StackedInline, TabularInline

from catalog import models as m

# Every text column is a TextField; only these hold prose, the rest are short values.
LONG_TEXT = {
    "summary", "source_citation", "rights_statement", "date_note", "review_notes", "notes",
    "citation", "item_ids", "detail", "suggested_action", "comments_and_notes_to_take_action",
    "text_body", "textile_term_as_written", "change_note", "basis", "variant_labels",
    "scope_note", "price_text_original", "physical_description", "object_history",
    "marks_inscriptions", "payload_text", "geojson", "original_value", "becomes",
}  # fmt: skip


class TextWidgets:
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if isinstance(db_field, models.TextField) and not db_field.choices:
            kwargs["widget"] = (
                forms.Textarea(attrs={"rows": 3})
                if db_field.name in LONG_TEXT
                else forms.TextInput
            )
        return super().formfield_for_dbfield(db_field, request, **kwargs)


class Tabular(TextWidgets, TabularInline):
    extra = 0
    tab = True


class Stacked(TextWidgets, StackedInline):
    extra = 0
    tab = True


class Admin(TextWidgets, VersionAdmin, ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        # Changing a text primary key in the admin would save a copy under the new ID.
        fields = super().get_readonly_fields(request, obj)
        return [*fields, self.model._meta.pk.name] if obj else fields


# --- Item ---------------------------------------------------------------


class DocumentDetailInline(Stacked):
    model = m.DocumentDetail


class ObjectDetailInline(Stacked):
    model = m.ObjectDetail


class VisualDetailInline(Stacked):
    model = m.VisualDetail


class ItemTextileInline(Stacked):
    model = m.ItemTextile


class ItemPlaceInline(Tabular):
    model = m.ItemPlace
    autocomplete_fields = ["place"]


class ItemAgentInline(Tabular):
    model = m.ItemAgent
    autocomplete_fields = ["agent"]


class ItemTermInline(Tabular):
    model = m.ItemTerm
    autocomplete_fields = ["term"]


class ItemTextInline(Stacked):
    model = m.ItemText


class MediaInline(Tabular):
    model = m.Media


class MovementInline(Tabular):
    model = m.Movement
    autocomplete_fields = ["from_place", "to_place"]


class TradeObservationInline(Stacked):
    model = m.TradeObservation


class RelationshipInline(Tabular):
    model = m.Relationship
    fk_name = "from_item"
    autocomplete_fields = ["to_item"]
    verbose_name_plural = "relationships (from this record)"


class CollectionItemInline(Tabular):
    model = m.CollectionItem


class DataIssueInline(Stacked):
    model = m.DataIssue
    fields = ["issue_type", "severity", "status", "field", "detail", "suggested_action",
              "comments_and_notes_to_take_action"]  # fmt: skip


class SourcePayloadInline(Stacked):
    model = m.SourcePayload
    readonly_fields = ["source_system", "fetched_at", "payload_text"]
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


@admin.action(description="Publish selected records (published and public)")
def publish(modeladmin, request, queryset):
    queryset.exclude(record_status="merged").update(
        record_status="published", is_public=True
    )


@admin.action(description="Mark selected records as reviewed")
def mark_reviewed(modeladmin, request, queryset):
    n = queryset.update(review_status="reviewed")
    messages.success(request, f"{n} records marked as reviewed.")


@admin.action(description="Make selected records private")
def make_private(modeladmin, request, queryset):
    queryset.update(is_public=False)


@admin.register(m.Item)
class ItemAdmin(Admin):
    ordering = ["item_id"]
    list_display = ["item_id", "title", "item_type", "record_status", "is_public",
                    "date_display", "review_status"]  # fmt: skip
    list_filter = ["item_type", "record_status", "is_public", "review_status",
                   "is_context_record", "evidence_level", "legacy_system"]  # fmt: skip
    search_fields = ["item_id", "title", "summary", "legacy_id", "source_identifier"]
    autocomplete_fields = ["merged_into", "source"]
    readonly_fields = ["date_display"]
    change_list_template = "admin/catalog/item/change_list.html"  # museum fetch buttons
    actions = [publish, mark_reviewed, make_private]
    fieldsets = [
        (None, {"fields": ["item_id", "item_type", "record_status", "is_public", "title",
                           "title_status", "summary", "content_warning", "is_context_record"]}),
        ("Date", {"fields": ["date_display", "date_start", "date_end", "date_precision",
                             "date_basis", "date_certainty", "date_as_recorded", "date_note"]}),
        ("Source", {"fields": ["source", "evidence_level", "holding_institution",
                               "source_identifier", "source_citation", "source_url",
                               "rights_statement"]}),
        ("Review", {"fields": ["review_status", "review_notes", "created_by", "ingest_method",
                               "ingested_at", "updated_at"]}),
        ("Legacy and merges", {"classes": ["collapse"],
                               "fields": ["legacy_system", "legacy_id", "merged_into", "merged_ids"]}),
    ]  # fmt: skip
    inlines = [
        DocumentDetailInline, ObjectDetailInline, VisualDetailInline, ItemTextileInline,
        ItemTermInline, ItemPlaceInline, ItemAgentInline, MovementInline, ItemTextInline,
        MediaInline, RelationshipInline, TradeObservationInline, CollectionItemInline,
        DataIssueInline, SourcePayloadInline,
    ]  # fmt: skip

    def get_urls(self):
        fetch = [
            path(f"fetch/{name}/", self.admin_site.admin_view(view), name=f"catalog_item_fetch_{name}")
            for name, view in [("all", self.fetch_all), ("vam", self.fetch_vam),
                               ("cooper_hewitt", self.fetch_cooper_hewitt)]
        ]  # fmt: skip
        return fetch + super().get_urls()

    def _fetch(self, request, *sources):
        from crawler.services import MuseumAPIClient

        if not self.has_add_permission(request):
            return redirect("admin:catalog_item_changelist")
        client = MuseumAPIClient()
        for label, method in sources:
            try:
                created, updated = getattr(client, method)()
                messages.success(
                    request,
                    f"{label}: {created} new staged records, {updated} refreshed.",
                )
            except Exception as e:
                messages.error(request, f"{label}: fetch failed ({e}).")
        return redirect("admin:catalog_item_changelist")

    def fetch_vam(self, request):
        return self._fetch(request, ("V&A", "fetch_vam"))

    def fetch_cooper_hewitt(self, request):
        return self._fetch(request, ("Cooper Hewitt", "fetch_cooper_hewitt"))

    def fetch_all(self, request):
        return self._fetch(
            request, ("Cooper Hewitt", "fetch_cooper_hewitt"), ("V&A", "fetch_vam")
        )


# --- Authorities --------------------------------------------------------


class PlaceGeometryInline(Stacked):
    model = m.PlaceGeometry


class PlaceAliasInline(Tabular):
    model = m.PlaceAlias


@admin.register(m.Place)
class PlaceAdmin(Admin):
    ordering = ["name_preferred"]
    list_display = ["place_id", "name_preferred", "name_modern", "place_type", "macro_region",
                    "map_level", "coord_status"]  # fmt: skip
    list_filter = ["place_type", "map_level", "coord_status", "macro_region"]
    search_fields = ["place_id", "name_preferred", "name_modern", "placealias__alias"]
    autocomplete_fields = ["broader_place"]
    inlines = [PlaceGeometryInline, PlaceAliasInline]


@admin.register(m.Agent)
class AgentAdmin(Admin):
    ordering = ["name_preferred"]
    list_display = ["agent_id", "name_preferred", "agent_type", "life_dates"]
    list_filter = ["agent_type"]
    search_fields = ["agent_id", "name_preferred", "name_variants"]


class TermAliasInline(Tabular):
    model = m.TermAlias


@admin.register(m.Term)
class TermAdmin(Admin):
    ordering = ["vocabulary", "label"]
    list_display = ["term_id", "label", "vocabulary", "status", "term_group"]
    list_filter = ["vocabulary", "status"]
    search_fields = ["term_id", "label", "variant_labels", "termalias__alias"]
    inlines = [TermAliasInline]


@admin.register(m.Source)
class SourceAdmin(Admin):
    ordering = ["source_id"]
    list_display = ["source_id", "citation", "holding_institution"]
    search_fields = ["source_id", "citation"]


class CollectionItemByCollectionInline(Tabular):
    model = m.CollectionItem
    autocomplete_fields = ["item"]
    tab = False


@admin.register(m.Collection)
class CollectionAdmin(Admin):
    ordering = ["collection_id"]
    list_display = ["collection_id", "name", "marker_place"]
    autocomplete_fields = ["marker_place"]
    inlines = [CollectionItemByCollectionInline]


# --- Review queue and logs ----------------------------------------------


@admin.register(m.DataIssue)
class DataIssueAdmin(Admin):
    ordering = ["issue_id"]
    list_display = ["issue_id", "item", "issue_type", "severity", "status"]
    list_filter = ["status", "severity", "issue_type"]
    search_fields = ["item__item_id", "legacy_id", "detail"]
    autocomplete_fields = ["item"]


@admin.register(m.NormalizationLog)
class NormalizationLogAdmin(ModelAdmin):
    ordering = ["log_id"]
    list_display = ["log_id", "field", "original_value", "becomes", "kind", "n_records"]
    list_filter = ["kind", "field"]
    search_fields = ["original_value", "becomes"]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
