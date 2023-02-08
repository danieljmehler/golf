# Golf Course and Score Tracker

Django and React application for show golf course information, recording scores, and calculating a handicap.

## Development

The application is split into a server-side Django application, and a client-side React application.
The server-side and client-side applications share a single git repository, but are managed separately.

### Server

```script
cd ./api
python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py migrate
python manage createsuperuser
python manage.py runserver
```

### Client

```script
cd ./client
npm install
npm start
```

The client becomes available at `http://localhost:3000`.

## TODO

* Replace hard-coded URLs, potentially with environment variables and/or using axios proxy
* Replace hard-coded authentication from client to server, potentially with environment variables
* Making adding a Round as easy as possible
  * This is the most common function a user will do, so should be as easy as possible
* Add tests and code coverage
* Format visualization of dates and come up with a better way to visualize a Round
* Version the API
* Dynamic/calculated fields in the API for calculating a handicap
* Containerize
