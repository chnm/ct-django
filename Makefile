preview :
	poetry run python3 manage.py runserver

# Compile TailwindCSS
tailwind :
	poetry run python3 manage.py tailwind start

# Django makemigrations
mm :
	poetry run python3 manage.py makemigrations

# Django migrate
migrate :
	poetry run python3 manage.py migrate

# Run Django tests
test :
	poetry run python3 manage.py test

shell :
	poetry run python3 manage.py shell

.PHONY : preview tailwind mm migrate test

