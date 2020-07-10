# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased]

### Added

- Initial documentation
- Development pipeline (eslint, prettier, storybook, jest, travis, rollup)
- Publish pipeline
- Initial form elements
- Support for basic internationalization
- Form logic (data mapping, validation, error handling)
- Integration to Helsinki's Open311 feedback system
- Ability to theme component
- Support for file upload
- Mandatory service request type field
- Configuration for including fields
- Option to re-initialize form fields when initial values change
- Quick start guide

### Changed

- If user details are pre-filled, the contact details section is revealed by default

### Removed

- Deprecate fluid prop (consumers can attain same results by using a theme)

### Fixed

- Double clicks on file upload
