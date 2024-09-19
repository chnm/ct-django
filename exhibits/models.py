from django.db import models
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Orderable, Page
from wagtail.search import index


class ExhibitHomeIndex(Page):
    intro = RichTextField(blank=True, help_text="Main content area for the exhibit.")
    content_panels = Page.content_panels + [FieldPanel("intro")]

    def get_context(self, request):
        context = super().get_context(request)
        exhibitpages = self.get_children().live()
        context["exhibitpages"] = exhibitpages
        return context


class ExhibitHome(Page):
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Exhibit landing page with full screen image",
    )
    hero_text = models.TextField(
        blank=True, max_length=355, help_text="An introduction to the exhibit."
    )
    hero_cta = models.CharField(
        max_length=255,
        blank=True,
        help_text="Call to action text for the exhibit landing page.",
        verbose_name="Call to Action",
    )
    hero_cta_link = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Link to a page or external URL.",
        verbose_name="Call to Action Link",
    )
    exhibit_display_order = models.IntegerField(
        blank=False, help_text="What order should the exhibit be displayed in?"
    )

    body = RichTextField(blank=True, help_text="Main content area for the exhibit.")
    tags = ClusterTaggableManager(through="ExhibitHomeTag", blank=True)

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("image"),
                FieldPanel("hero_text"),
                FieldPanel("hero_cta"),
                FieldPanel("hero_cta_link"),
                FieldPanel("exhibit_display_order"),
                FieldPanel("tags"),
            ],
            heading="Hero section",
        ),
        FieldPanel("body"),
        InlinePanel("gallery_images", label="Gallery images"),
        InlinePanel("image_comparisons", label="Image comparisons"),
    ]


class ExhibitHomeGalleryImage(Orderable):
    page = ParentalKey(
        ExhibitHome, on_delete=models.CASCADE, related_name="gallery_images"
    )
    image = models.ForeignKey(
        "wagtailimages.Image", on_delete=models.CASCADE, related_name="+"
    )
    caption = models.CharField(blank=True, max_length=255)
    panels = [FieldPanel("image"), FieldPanel("caption")]


class ExhibitHomeTag(TaggedItemBase):
    content_object = ParentalKey(
        "ExhibitHome", related_name="tagged_items", on_delete=models.CASCADE
    )


class ImageComparison(Orderable):
    page = ParentalKey(
        ExhibitHome, on_delete=models.CASCADE, related_name="image_comparisons"
    )
    first_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Exhibit landing page image",
    )
    second_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Exhibit landing page image",
    )

    slider_value = models.IntegerField(default=50)

    panels = [
        FieldPanel("first_image"),
        FieldPanel("second_image"),
        FieldPanel("slider_value"),
    ]


class GeneralPage(Page):
    body = RichTextField(blank=True, help_text="General site pages.")
    sidebar = RichTextField(blank=True, help_text="Sidebar content for the page.")

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("body"),
        FieldPanel("sidebar"),
    ]
