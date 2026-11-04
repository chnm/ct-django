from django.template import Context, Template
from django.test import TestCase

from catalog.models import Item, ItemText, Media, Relationship
from catalog.testing import add_place, add_term, make_item
from catalog.views import public_items


class IndexViewTest(TestCase):
    def test_index_counts_only_public_records(self):
        make_item()
        make_item(is_public=False)
        make_item(record_status="staged")
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["record_count"], 1)


class DatabaseTagsTest(TestCase):
    def render(self, tpl, **ctx):
        return Template("{% load database_tags %}" + tpl).render(Context(ctx))

    def test_date_display_exact_approximate_empty(self):
        exact = make_item(date_start=1748, date_end=1748)
        self.assertEqual(
            self.render("{{ i|date_display }}", i=exact),
            '<span class="font-mono">1748</span>',
        )
        approx = make_item(date_start=1855, date_end=1879, date_precision="circa_range")
        html = self.render("{{ i|date_display }}", i=approx)
        self.assertIn("border-dotted", html)
        self.assertIn("ca. 1855-1879", html)
        self.assertIn("&mdash;", self.render("{{ i|date_display }}", i=make_item()))

    def test_precision_dot_place_and_area(self):
        item = make_item(circulation="pr")
        place = add_place(item, "origin", "Madras")
        area = add_place(item, "destination", "India", precision="area")
        item = public_items().get(pk=item.pk)
        html = self.render("{% precision_dot link item %}", link=place, item=item)
        self.assertIn("bg-madras-green", html)
        self.assertIn(
            "border-dashed",
            self.render("{% precision_dot link item %}", link=area, item=item),
        )

    def test_circulation_tag_labels_including_several_phases(self):
        item = make_item(circulation="td")
        add_term(item, "circulation_stage", "Consumption")
        html = self.render("{% circulation_tag i %}", i=public_items().get(pk=item.pk))
        self.assertIn("Trade &amp; Distribution", html)
        self.assertIn("Consumption", html)
        html = self.render(
            "{% circulation_tag i %}", i=public_items().get(pk=make_item().pk)
        )
        self.assertIn("Unassigned", html)


class DatabaseListViewTest(TestCase):
    def setUp(self):
        self.a = make_item(circulation="pr", date_start=1748, date_end=1748)
        self.b = make_item(circulation="td", date_start=1800, date_precision="circa")
        self.c = make_item(date_start=1900)  # unassigned
        self.undated = make_item(circulation="co")
        make_item(circulation="pr", date_start=1750, is_public=False)

    def test_list_context_has_timeline_and_renders_swimlane(self):
        response = self.client.get("/database/")
        self.assertEqual(response.status_code, 200)
        t = response.context["timeline"]
        self.assertEqual((t.placed, t.total, t.unassigned, t.undated), (2, 4, 1, 1))
        html = response.content.decode()
        self.assertIn('id="swimlane"', html)
        self.assertIn("2 of 4 records placed by circulation", html)

    def test_htmx_response_swaps_table_and_swimlane_out_of_band(self):
        response = self.client.get("/database/?circulation=pr", HTTP_HX_REQUEST="true")
        html = response.content.decode()
        self.assertTrue(html.lstrip().startswith('<div class="table-container"'))
        self.assertIn('hx-swap-oob="true"', html)
        self.assertIn("1 of 1 records placed by circulation", html)

    def test_table_columns_and_cells(self):
        item = make_item(circulation="co", date_start=1755, date_precision="circa")
        add_place(item, "origin", "India", precision="area")
        add_place(item, "destination", "Kingston")
        add_term(item, "textile_type", "Madras")
        html = self.client.get("/database/").content.decode()
        for header in [
            "Preview",
            "Date",
            "Textile type",
            "Form",
            "Origin",
            "Circulation",
            "Actions",
        ]:
            self.assertIn(header, html)
        self.assertIn("border-dotted", html)  # approximate date
        self.assertIn("border-dashed", html)  # area-only precision ring
        self.assertIn("Kingston", html)
        self.assertIn("Madras", html)
        self.assertIn("Unassigned", html)
        self.assertIn(f"/database/{item.pk}/quick-view/", html)

    def test_filters(self):
        def ids(query):
            return {
                i.pk
                for i in self.client.get(f"/database/?{query}").context["table"].data
            }

        self.assertEqual(ids("circulation=pr&circulation=td"), {self.a.pk, self.b.pk})
        self.assertEqual(ids("year_range=1700-1790"), {self.a.pk})
        add_place(self.b, "destination", "Kingston", macro_region="Caribbean")
        self.assertEqual(ids("to_region=Caribbean"), {self.b.pk})
        add_term(self.c, "keyword", "Weavers")
        self.assertEqual(ids("keyword=weavers"), {self.c.pk})
        ItemText.objects.create(item=self.a, text_role="transcription", status="present",
                                text_body="Coarse cloth sold weekly")  # fmt: skip
        self.assertEqual(ids("text_search=coarse"), {self.a.pk})

    def test_unfiltered_list_keeps_undated_records(self):
        html = self.client.get("/database/").content.decode()
        self.assertIn(self.undated.pk, html)
        self.assertNotIn('name="year_range"', html)  # only named once narrowed

    def test_sidebar_controls(self):
        html = self.client.get("/database/").content.decode()
        self.assertIn("Search filters", html)
        self.assertIn('name="circulation" value="pr"', html)
        self.assertIn('name="textile_type"', html)
        self.assertIn('name="to_region"', html)
        self.assertIn('name="text_search"', html)
        self.assertNotIn('name="keyword"', html)


class QuickViewTest(TestCase):
    def test_public_record_returns_row_partial(self):
        item = make_item(
            circulation="td",
            date_start=1680,
            summary="Local consumption of coarse textiles.",
        )
        add_place(item, "origin", "India", precision="area")
        html = self.client.get(f"/database/{item.pk}/quick-view/").content.decode()
        self.assertTrue(html.lstrip().startswith("<tr"))
        self.assertIn(f"Quick view &middot; Record {item.pk}", html)
        self.assertIn("Local consumption", html)
        self.assertIn("Place: area only", html)

    def test_private_record_is_404(self):
        item = make_item(is_public=False)
        self.assertEqual(
            self.client.get(f"/database/{item.pk}/quick-view/").status_code, 404
        )


class RecordPageTest(TestCase):
    def setUp(self):
        self.item = make_item(circulation="td", date_start=1680, date_end=1680, keywords=["Weavers"],
                              title="Record: Weavers, Madras, 1680", summary="Local consumption.",
                              source_citation="Ramaswamy, Vijaya.")  # fmt: skip
        ItemText.objects.create(item=self.item, text_role="transcription", status="present",
                                text_body="Coarse cloth was sold weekly.")  # fmt: skip
        add_place(self.item, "origin", "India", precision="area")
        self.other = make_item(circulation="pr", date_start=1700, date_end=1799,
                               date_precision="century", keywords=["Weavers"])  # fmt: skip
        self.private = make_item(is_public=False, keywords=["Weavers"])

    def get(self, item_id):
        return self.client.get(f"/database/{item_id}/")

    def test_record_page_context_and_sections(self):
        response = self.get(self.item.pk)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["date_certainty"], "exact year")
        self.assertEqual([r.pk for r in response.context["linked"]], [self.other.pk])
        self.assertEqual(response.context["linked_reason"], "shares keyword “Weavers”")
        self.assertTrue(response.context["timeline"].band)
        html = response.content.decode()
        self.assertIn("Record: Weavers, Madras, 1680", html)
        self.assertIn("This record highlighted", html)
        self.assertIn("Coarse cloth was sold weekly.", html)
        self.assertIn("Located to an area only", html)
        self.assertIn("No images are available for this record.", html)

    def test_unplaced_record_does_not_dim_the_timeline(self):
        unassigned = make_item(date_start=1750)
        response = self.get(unassigned.pk)
        bars = [b for lane in response.context["timeline"].lanes for b in lane.bars]
        self.assertTrue(bars)
        self.assertFalse(any(b.dimmed for b in bars))
        self.assertIn("not placed on the timeline", response.content.decode())

    def test_confirmed_relationships_come_first_proposed_are_ignored(self):
        linked = make_item(circulation="co", date_start=1690)
        proposed = make_item(circulation="co", date_start=1691)
        Relationship.objects.create(from_item=linked, to_item=self.item, rel_type="see_also",
                                    status="confirmed", confidence="high")  # fmt: skip
        Relationship.objects.create(from_item=self.item, to_item=proposed, rel_type="see_also",
                                    status="proposed", confidence="low")  # fmt: skip
        response = self.get(self.item.pk)
        self.assertEqual(
            [r.pk for r in response.context["linked"]], [linked.pk, self.other.pk]
        )
        self.assertEqual(response.context["linked_reason"], "related records")

    def test_private_and_merged_records_are_404(self):
        self.assertEqual(self.get(self.private.pk).status_code, 404)
        merged = make_item(record_status="merged", is_public=False)
        self.assertEqual(self.get(merged.pk).status_code, 404)

    def test_content_warning_and_image(self):
        self.item.content_warning = "Describes enslaved people."
        self.item.save()
        Media.objects.create(item=self.item, media_type="image", is_primary=True,
                             storage_key="images/x.jpg")  # fmt: skip
        html = self.get(self.item.pk).content.decode()
        self.assertIn("Describes enslaved people.", html)
        self.assertIn("images/x.jpg", html)
        self.assertNotIn("connectingthreads.co.uk/images", html)


class OldRecordUrlTest(TestCase):
    def test_old_numeric_ids_redirect_permanently(self):
        item = make_item(legacy_system="TextileRecord", legacy_id="42")
        response = self.client.get("/database/42/")
        self.assertEqual(response.status_code, 301)
        self.assertEqual(response.url, f"/database/{item.pk}/")

    def test_merged_record_redirects_to_its_survivor(self):
        survivor = make_item(legacy_system="TextileRecord", legacy_id="1")
        make_item(legacy_system="TextileRecord", legacy_id="2", record_status="merged",
                  is_public=False, merged_into=survivor)  # fmt: skip
        self.assertEqual(
            self.client.get("/database/2/").url, f"/database/{survivor.pk}/"
        )

    def test_unknown_old_id_is_404(self):
        self.assertEqual(self.client.get("/database/999/").status_code, 404)


class ExhibitRelatedRecordsTest(TestCase):
    def test_private_records_are_not_listed(self):
        from exhibits.tests import make_chapter

        _, (page,) = make_chapter("Chapter A", 1, ["One"])
        shown = make_item(title="Shown record")
        hidden = make_item(title="Hidden record")
        page.related_records.add(shown, hidden)
        page.save_revision().publish()
        Item.objects.filter(pk=hidden.pk).update(is_public=False)
        html = self.client.get(page.url).content.decode()
        self.assertIn("Shown record", html)
        self.assertNotIn("Hidden record", html)
