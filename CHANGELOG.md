# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.3] - 2023-02-07

### Added

* Flushed out README with startup instructions and TODO list
* Added test data and instructions for loading

### Updated

* Cleaned up spacing, formatting, semi-colons, and imports in client
* Updated data retrieval logic in client to pass data between views, so that it only fetches data when needed

### Fixed

* Links in CHANGELOG now point to the correct repository

## [0.0.2] - 2023-02-01

### Added

- Added `id` field to all serializers
- Added `CORS` to API for connecting API and client on separate localhost ports
- Added configuration to use `DJANGO_LOG_LEVEL` to configure logging levels for the API
- Created initial React client using [Create React App](https://github.com/facebook/create-react-app) with list and detail pages for Courses, Tees, HoleInfo, and Rounds, as well as Modals to Add, Edit, and Delete objects

### Updated

- Updated directory structure, with `.gitignore` files in each `./api` and `./client` directories, specific to python and react, respectively

## [0.0.1] - 2023-01-25

### Added

- Initialized [Django](https://www.djangoproject.com/) project with apps: course, golfer, holeinfo, holescore, round, and tee
- Client-side includes only [Django REST Framework](https://www.django-rest-framework.org/) default forms

[unreleased]: https://github.com/danieljmehler/golf/compare/0.0.3...HEAD
[0.0.3]: https://github.com/danieljmehler/golf/releases/tag/0.0.3
[0.0.2]: https://github.com/danieljmehler/golf/releases/tag/0.0.2
[0.0.1]: https://github.com/danieljmehler/golf/releases/tag/0.0.1
