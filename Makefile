# Development Commands
# ====================

.DEFAULT_GOAL := help

preview:
	uv run python manage.py runserver

check:
	uv run python manage.py check

# Compile TailwindCSS
tailwind:
	uv run python manage.py tailwind start

# Django makemigrations
mm:
	uv run python manage.py makemigrations

# Django migrate
migrate:
	uv run python manage.py migrate

# Run Django tests
test:
	uv run python -m pytest

lint:
	uv run pre-commit run --all-files

shell:
	uv run python manage.py shell

help:
	@echo "Connecting Threads - Available Commands"
	@echo "  preview   Start the development server"
	@echo "  check     Run Django system checks"
	@echo "  tailwind  Watch and rebuild Tailwind CSS"
	@echo "  mm        Create model migrations"
	@echo "  migrate   Apply database migrations"
	@echo "  test      Run the pytest suite"
	@echo "  lint      Run all pre-commit checks"
	@echo "  shell     Open the Django shell"

.PHONY: preview check tailwind mm migrate test lint shell help
