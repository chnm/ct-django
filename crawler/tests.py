from unittest.mock import patch

from django.test import SimpleTestCase, override_settings

from crawler.services import MuseumAPIClient

# A real Cooper Hewitt GraphQL record (legacy id 18446443), trimmed.
CH_RECORD = {
    "id": "object-133737",
    "collectionsOnlineId": "18446443",
    "summary": {"title": "Sample woven after Jackson book (1958-30-1)"},
    "title": None,
    "name": [{"value": "Sample woven after Jackson book (1958-30-1)"}],
    "date": [{"from": "1963", "to": "1963", "value": "1963"}],
    "medium": [{"value": "Linen"}],
    "description": [
        {"type": "general description", "value": "Sample woven after Jackson book."}
    ],
    "classification": [{"summary": {"title": "woven textiles"}}],
    "geography": {"country": {"value": "USA"}, "geocode": "made in", "name": "USA"},
    "multimedia": [
        {
            "id": "media-206188",
            "large": {"url": "https://example.test/large.jpg"},
            "preview": {"url": "https://example.test/preview.jpg"},
        }
    ],
    "identifier": [
        {"value": "1963-15-2", "type": "accession number"},
        {"value": "133737", "type": "tms id"},
        {"value": "18446443", "type": "legacy collections online id"},
    ],
}


class CooperHewittMappingTests(SimpleTestCase):
    def test_maps_graphql_record(self):
        d = MuseumAPIClient._ch_defaults(CH_RECORD)
        self.assertEqual(d["title"], "Sample woven after Jackson book (1958-30-1)")
        self.assertEqual(d["date"], "1963")
        self.assertEqual(d["description"], "Sample woven after Jackson book.")
        self.assertEqual(d["item_type"], "woven textiles")
        self.assertEqual(d["medium"], "Linen")
        self.assertEqual(d["country"], "USA")
        self.assertEqual(d["url"], "https://www.si.edu/object/chndm_1963-15-2")
        self.assertEqual(d["thumbnail"], "https://example.test/preview.jpg")
        self.assertEqual(d["image_url"], "https://example.test/large.jpg")

    def test_tolerates_sparse_record(self):
        d = MuseumAPIClient._ch_defaults(
            {"id": "object-1", "title": [{"value": "T"}], "medium": ["cotton"]}
        )
        self.assertEqual(d["title"], "T")
        self.assertEqual(d["medium"], "cotton")
        self.assertEqual((d["url"], d["country"], d["thumbnail"]), ("", "", ""))

    @override_settings(COOPER_HEWITT_QUERY='country:"Nigeria"')
    def test_query_path_pages_through_results(self):
        pages = [
            {
                "data": {"object": [{"id": f"object-{n}"}]},
                "extensions": {"pagination": {"number_of_pages": 2}},
            }
            for n in range(2)
        ]
        with patch.object(MuseumAPIClient, "_ch_query", side_effect=pages) as q:
            ids = [r["id"] for r in MuseumAPIClient()._ch_records()]
        self.assertEqual(ids, ["object-0", "object-1"])
        self.assertIn(
            'object(country:"Nigeria", size:100, page:1)', q.call_args_list[1].args[0]
        )
