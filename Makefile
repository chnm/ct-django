preview :
	poetry run python3 manage.py runserver

# Compile TailwindCSS
tailwind :
	poetry run python3 manage.py tailwind start

mm :
	poetry run python3 manage.py makemigrations

migrate :
	poetry run python3 manage.py migrate

test :
	poetry run python3 manage.py test


.PHONY : preview tailwind mm migrate test

