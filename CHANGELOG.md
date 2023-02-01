# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/0.0.2...HEAD
[0.0.2]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/0.0.2
[0.0.1]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/0.0.1
