from django.utils.html import format_html

THUMBNAIL_IMG_STYLE = "width: 60px; height: 60px; object-fit: cover; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
THUMBNAIL_PLACEHOLDER_STYLE = "width: 60px; height: 60px; background-color: #f3f4f6; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;"


def admin_thumbnail(url):
    return format_html('<img src="{}" style="{}" />', url, THUMBNAIL_IMG_STYLE)


def admin_thumbnail_placeholder(text="No Image"):
    return format_html('<div style="{}">{}</div>', THUMBNAIL_PLACEHOLDER_STYLE, text)
