preview :
	uv run manage.py runserver

# Compile TailwindCSS
tailwind :
	uv run manage.py tailwind start

# Django makemigrations
mm :
	uv run manage.py makemigrations

# Django migrate
migrate :
	uv run manage.py migrate

# Run Django tests
test :
	uv run manage.py test

shell :
	uv run manage.py shell

.PHONY : preview tailwind mm migrate test

