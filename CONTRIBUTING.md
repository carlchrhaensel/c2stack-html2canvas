# Contributing to html2canvas

Thank you for your interest in contributing to html2canvas! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

-   [Bun](https://bun.sh) >= 1.0.0

### Getting Started

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/html2canvas.git
cd html2canvas
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

## Development Workflow

### Building

Build the project:

```bash
bun run build
```

### Testing

Run unit tests:

```bash
bun run test:unit
```

Run tests in watch mode:

```bash
bun run test:watch
```

Run tests with UI:

```bash
bun run test:ui
```

Run browser tests with Playwright:

```bash
bun run test:browser
```

Generate coverage report:

```bash
bun run test:coverage
```

### Linting and Formatting

Lint the code:

```bash
bun run lint
```

Auto-fix linting issues:

```bash
bun run lint:fix
```

Format the code:

```bash
bun run format
```

## Code Quality

This project uses:

-   **Biome** for linting and formatting
-   **Vitest** for unit testing
-   **Playwright** for browser testing
-   **TypeScript** for type safety
-   **Husky** for git hooks
-   **lint-staged** for pre-commit checks

### Pre-commit Hooks

When you commit, the following will run automatically:

-   Biome linting and formatting on staged files
-   Vitest on related test files

## Adding New Features

1. Create a new branch from `master`:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and add tests

3. Ensure all tests pass:

```bash
bun run test
```

4. Create a changeset for your changes:

```bash
bun run changeset
```

5. Commit your changes:

```bash
git add .
git commit -m "Description of your changes"
```

6. Push and create a pull request

## CSS Property Support

When adding support for a new CSS property:

1. Create a property descriptor in `src/css/property-descriptors/`
2. Add the property to the property descriptor index
3. Add tests for the new property
4. Update documentation if needed

## Browser Compatibility

This project targets modern browsers:

-   Chrome 80+
-   Firefox 75+
-   Safari 13.1+
-   Edge 80+

Ensure your code works in all supported browsers.

## Testing Requirements

-   All new features must include unit tests
-   Complex features should include integration tests
-   Test files should be placed in `__tests__` directories alongside the code
-   Use descriptive test names

## Pull Request Guidelines

-   Keep pull requests focused on a single feature or fix
-   Include tests for new functionality
-   Update documentation as needed
-   Follow the existing code style
-   Write clear commit messages
-   Add a changeset describing your changes

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

1. Add a changeset: `bun run changeset`
2. Select the type of change (patch, minor, major)
3. Write a description of the changes
4. Commit the changeset file

Maintainers will handle the release process.

## Questions?

If you have questions, please:

-   Check existing [discussions](https://github.com/niklasvh/html2canvas/discussions)
-   Open a new discussion in the Q&A category
-   Check the [documentation](https://html2canvas.hertzen.com)

## Code of Conduct

Be respectful and constructive in all interactions. We're here to build great software together.

Thank you for contributing! 🎉
