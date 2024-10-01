from django.db import models
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Orderable, Page
from wagtail.search import index


class GeneralPage(Page):
    # LAYOUTS_CHOICES = [
    #     ("one_column", "One Column"),
    #     ("two_column", "Two Column"),
    #     ("three_column", "Three Column"),
    #     ("five_column", "Five Column"),
    # ]
    body = RichTextField(blank=True, help_text="General site pages.")
    sidebar = RichTextField(blank=True, help_text="Sidebar content for the page.")
    # layout = models.CharField(
    #     max_length=11,
    #     choices=LAYOUTS_CHOICES,
    #     default="one_column",
    #     help_text="Select the layout for this page.",
    # )

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        # FieldPanel("layout"),
        FieldPanel("body"),
        FieldPanel("sidebar"),
    ]


class ExhibitHome(Page):
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Exhibit landing page with full screen image",
    )
    image_caption = models.CharField(
        max_length=500,
        blank=True,
        help_text="Caption for the exhibit landing page image.",
        verbose_name="Image caption",
    )
    hero_text = models.TextField(
        blank=True,
        max_length=355,
        help_text="An introduction to the exhibit.",
        verbose_name="Entry button text",
    )
    hero_cta = models.CharField(
        max_length=255,
        blank=True,
        help_text="Entry text for the exhibit landing page.",
        verbose_name="Enter the exhibit text",
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
    citation_text = models.TextField(
        blank=True,
        help_text="Citation information for the exhibit.",
        verbose_name="Citation",
    )
    next_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Link to the next page in the exhibit.",
    )
    previous_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Link to the previous page in the exhibit.",
    )
    is_chapter_intro_page = models.BooleanField(
        default=False,
        help_text="Is this the first page of a chapter? If checked, yes.",
    )

    body = RichTextField(
        blank=True, help_text="Optional additional text for the exhibit landing page."
    )
    tags = ClusterTaggableManager(through="ExhibitHomeTag", blank=True)

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("image"),
                FieldPanel("image_caption"),
                FieldPanel("hero_text"),
                # FieldPanel("hero_cta"),
                # FieldPanel("hero_cta_link"),
                FieldPanel("exhibit_display_order"),
                FieldPanel("citation_text"),
                # FieldPanel("tags"),
            ],
            heading="Introductory content",
        ),
        FieldPanel("body"),
        FieldPanel("next_page"),
        FieldPanel("previous_page"),
        FieldPanel("is_chapter_intro_page"),
    ]


class ExhibitPage(Page):
    LAYOUT_CHOICES = [
        ("left_image_one_third", "Left Image, One Third"),
        ("right_image_one_third", "Right Image, One Third"),
        ("left_image_two_thirds", "Left Image, Two Thirds"),
        ("right_image_two_thirds", "Right Image, Two Thirds"),
        ("half_and_half", "Half and Half"),
        ("full_screen", "Full Screen"),
        ("wide_image", "Wide Image"),
    ]

    layout = models.CharField(
        max_length=22,
        choices=LAYOUT_CHOICES,
        default="left_image_one_third",
        help_text="Select the layout for this exhibit page.",
    )
    display_title = models.BooleanField(
        default=True,
        help_text="Display the title on the page or not. Checked means yes.",
    )
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Image for the exhibit page.",
    )
    image_caption = models.CharField(
        max_length=500,
        blank=True,
        help_text="Caption for the exhibit page image.",
        verbose_name="Image caption",
    )
    body = RichTextField(blank=True)
    link_to_next_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    link_to_previous_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    content_panels = Page.content_panels + [
        FieldPanel("layout"),
        FieldPanel("display_title"),
        FieldPanel("image"),
        FieldPanel("image_caption"),
        FieldPanel("body"),
        FieldPanel("link_to_next_page"),
        FieldPanel("link_to_previous_page"),
        InlinePanel(
            "image_comparisons",
            label="Image Comparisons",
            help_text="The recommended page layout for displaying image comparisons are any of the two-thirds layouts or wide screen layouts.",
        ),
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
        ExhibitPage, on_delete=models.CASCADE, related_name="image_comparisons"
    )
    first_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="First image to compare",
    )
    first_image_caption = models.CharField(
        max_length=500,
        blank=True,
        help_text="Caption for the first image.",
        verbose_name="Image caption",
    )
    second_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Second image to compare",
    )
    second_image_caption = models.CharField(
        max_length=500,
        blank=True,
        help_text="Caption for the second image.",
        verbose_name="Image caption for the second image",
    )

    slider_value = models.IntegerField(default=50)

    panels = [
        FieldPanel("first_image"),
        FieldPanel("first_image_caption"),
        FieldPanel("second_image"),
        FieldPanel("second_image_caption"),
        FieldPanel("slider_value"),
    ]
