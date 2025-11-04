# Connecting Threads

A Django-based digital humanities project for researching and cataloging textile trade data, with integrated museum collection crawling and comprehensive data management capabilities.

**Tech Stack:** Python 3.12 / Django 5.0 / PostgreSQL 17 / Tailwind CSS / Wagtail CMS

## Project Overview

Connecting Threads is a digital scholarship project that combines:
- **Textile record management** with comprehensive metadata and relationships
- **Museum collection integration** through automated crawling of V&A and Cooper-Hewitt APIs
- **Research workflow tools** for reviewing, publishing, and exporting data
- **Public-facing interface** built with Wagtail CMS
- **Modern admin interface** powered by Django Unfold

### Key Features

#### 🏛️ Museum Collection Crawler
- **Automated data fetching** from Victoria & Albert Museum and Cooper-Hewitt APIs
- **Image downloading** with thumbnail generation and IIIF support
- **Review workflow** for quality control before publishing
- **Batch operations** for efficient data processing

#### 📊 Textile Record Management
- **Comprehensive metadata** including dates, locations, subjects, and textile types
- **Relationship mapping** between places, areas, subjects, and named actors
- **Image management** with public/private visibility controls
- **Tag-based organization** with keyword support

#### 🔧 Admin Interface
- **Modern UI** with Django Unfold theme integration
- **Thumbnail previews** in list views for quick visual identification
- **Advanced filtering** and search capabilities
- **Bulk actions** for efficient data management
- **Export functionality** with customizable field mappings

#### 📈 Data Export & Analysis
- **Multiple export formats** (CSV, Excel, JSON) via django-import-export
- **Custom field mappings** with human-readable column names
- **Comprehensive data** including relationships, images, and metadata
- **Research-ready datasets** for analysis and sharing

## Development Setup

### Prerequisites
- Python 3.12+
- PostgreSQL 17+
- Node.js (for Tailwind CSS compilation)

### Installation

The project uses [uv](https://github.com/astral-sh/uv) for fast Python package management:

```bash
cd ct-django

# Install dependencies
uv sync

# Install pre-commit hooks for code formatting
uv run pre-commit install
uv run pre-commit autoupdate
```

### Environment Configuration

Create a `.env` file with required configuration:

```bash
# Generate a secure secret key
echo "DJANGO_SECRET_KEY=$(uv run python -c 'import secrets; print(secrets.token_urlsafe())')" >> .env

# Basic Django settings
echo "DEBUG=True" >> .env
echo "DJANGO_ALLOWED_HOSTS=localhost" >> .env
echo "DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost" >> .env

# Database configuration
echo "DB_HOST=localhost" >> .env
echo "DB_PORT=5432" >> .env
echo "DB_NAME=connectingthreads" >> .env
echo "DB_USER=connectingthreads" >> .env
echo "DB_PASS=your_password" >> .env

# Museum API keys
echo "COOPER_HEWITT_API_KEY=your_cooper_hewitt_key" >> .env
```

### Database Setup

```bash
# Create PostgreSQL database
createdb connectingthreads

# Run migrations
uv run python manage.py migrate

# Create superuser
uv run python manage.py createsuperuser
```

### Running the Development Server

```bash
# Start the Django development server
uv run python manage.py runserver

# In a separate terminal, compile Tailwind CSS
uv run python manage.py tailwind start
```

### Makefile Commands

Common development tasks are available via Makefile:

- `make preview`: Start the development server (`uv run python manage.py runserver`)
- `make tailwind`: Start Tailwind CSS compilation in watch mode
- `make mm`: Create Django migrations (`uv run python manage.py makemigrations`)
- `make migrate`: Apply Django migrations (`uv run python manage.py migrate`)
- `make test`: Run the test suite
- `make lint`: Run code linting and formatting

## Project Structure

```
ct-django/
├── config/           # Django settings and configuration
├── material/         # Core textile record models and admin
├── crawler/          # Museum API crawling functionality  
├── exhibits/         # Exhibition and display models
├── theme/            # Tailwind CSS theme and styling
├── templates/        # Django templates
├── static/           # Static assets
├── media/            # Uploaded files and images
└── requirements/     # Dependency specifications
```

## Usage

### Museum Collection Crawling

1. **Access the admin interface** at `/admin/`
2. **Navigate to Crawler → Staged Museum Items**
3. **Use the fetch buttons** to download data:
   - "Fetch All Data" - Downloads from both museums
   - "Fetch Cooper-Hewitt" - Downloads from Cooper-Hewitt API
   - "Fetch V&A" - Downloads from Victoria & Albert Museum API

### Review and Publishing Workflow

1. **Review fetched items** in the Staged Museum Items list
2. **Add review notes** and mark items as reviewed
3. **Publish approved items** to create TextileRecord entries
4. **Manage published records** in the Textile Records admin

### Data Export

Both Staged Museum Items and Textile Records support comprehensive data export:

1. **Select records** to export (or export all)
2. **Choose export format** (CSV, Excel, JSON)
3. **Download** research-ready datasets with proper column names

## Contributing

We use pre-commit hooks to maintain code quality:

```bash
# Install hooks
uv run pre-commit install

# Run hooks manually
uv run pre-commit run --all-files
```

Code formatting is handled by:
- **Black** for Python code formatting
- **djhtml** for Django template formatting
- **Ruff** for Python linting

## License

[Add license information here]

## Acknowledgments

This project is developed by the Roy Rosenzweig Center for History and New Media at George Mason University. Museum data is provided through the generous APIs of:

- Victoria & Albert Museum, London
- Cooper-Hewitt, Smithsonian Design Museum
