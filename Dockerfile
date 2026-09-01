FROM node:22-bookworm-slim AS node-runtime

FROM python:3.12-slim-trixie

COPY --from=node-runtime /usr/local/bin/ /usr/local/bin/
COPY --from=node-runtime /usr/local/lib/node_modules/ /usr/local/lib/node_modules/

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_PROJECT_ENVIRONMENT=/venv \
    UV_LINK_MODE=copy

RUN pip install --no-cache-dir "uv==0.9.6"

WORKDIR /app

# Install dependencies in a cacheable layer. Image builds must use the
# committed lockfile instead of resolving a different dependency graph.
COPY pyproject.toml uv.lock ./
RUN uv sync --locked --all-groups --no-install-project

COPY . ./
RUN uv sync --locked --all-groups \
    && uv run --no-sync manage.py tailwind install \
    && uv run --no-sync manage.py tailwind build \
    && uv run --no-sync manage.py collectstatic --no-input

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health/', timeout=4)"

CMD ["uv", "run", "--no-sync", "daphne", "-b", "0.0.0.0", "-p", "8000", "config.asgi:application"]
