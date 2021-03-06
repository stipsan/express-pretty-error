# express-pretty-error change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0-alpha.3] - 2017-03-30
### Added

* Support for LESS.js style errors.

## [1.0.0-alpha.2] - 2017-03-29
### Changed

* Default export is now a function creating the middleware (it will be made configurable soon).

### Removed

* Test css code from html renderer.

## [1.0.0-alpha.1] - 2017-03-29
### Fixed

* Package names in readme was incorrect.

## 1.0.0-alpha.0 - 2017-03-29
### Supported content types

* html, raw text and terminal cli using `print-error`.
* json, like `errorhandler`.
* css, like how SASS output errors.

[Unreleased]: https://github.com/stipsan/express-pretty-error/compare/v1.0.0-alpha.3...HEAD
[1.0.0-alpha.3]: https://github.com/stipsan/express-pretty-error/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/stipsan/express-pretty-error/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/stipsan/express-pretty-error/compare/v1.0.0-alpha.0...v1.0.0-alpha.1
