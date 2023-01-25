rm -f db.sqlite3
rm -rf {base,course,golfer,holeinfo,holescore,round,tee}/migrations/*
touch {base,course,golfer,holeinfo,holescore,round,tee}/migrations/__init__.py
python manage.py makemigrations

