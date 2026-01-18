# Project Modernization TODO

This document outlines the comprehensive modernization plan for html2canvas.

## 🏗️ Build System & Tooling

-   [x] Replace Rollup with Vite or tsup for better DX and faster builds
-   [x] Remove Webpack entirely (currently only used for preview builds)
-   [x] Remove UglifyJS (use modern minifiers like esbuild or swc)
-   [x] Update all @rollup plugins to latest versions if keeping Rollup
-   [x] Convert rollup.config.ts to use ESM imports instead of require
-   [x] Consolidate build configuration files
-   [x] Replace ts-node with native Bun TypeScript execution
    -   [x] Update scripts to use `bun run` instead of `ts-node`
    -   [x] Update test server script
    -   [x] Update reftest scripts
-   [ ] Consider adding unbuild as alternative to Rollup

## 🧪 Testing Infrastructure

-   [x] Remove Karma (deprecated and unmaintained)
-   [x] Replace with Vitest for unit tests
-   [x] Add Playwright for browser testing
-   [x] Remove Mocha (consolidate on single test framework)
-   [x] Update jest.config.js to vitest.config.ts
-   [x] Remove karma.conf.js
-   [x] Consolidate all test configurations
-   [x] Update test scripts in package.json
-   [x] Migrate existing Jest tests to Vitest
    -   [x] Replace `jest.mock()` with `vi.mock()`
    -   [x] Replace `jest.spyOn()` with `vi.spyOn()`
    -   [x] Replace `jest.fn()` with `vi.fn()`
    -   [x] Update mock implementations to Vitest API
    -   [x] Fix test files in `src/__tests__/index.ts`
    -   [x] Fix test files in `src/core/__tests__/logger.ts`
    -   [x] Fix test files in `src/css/property-descriptors/__tests__/background-tests.ts`
    -   [x] Fix test files in `src/css/types/__tests__/image-tests.ts`
-   [x] Set up Playwright for cross-browser testing
    -   [x] Create browser test files in `tests/` directory
    -   [x] Write e2e tests for core rendering functionality
    -   [ ] Add visual regression testing
    -   [x] Configure Playwright for CI
-   [x] Add test coverage reporting
    -   [x] Configure coverage thresholds
    -   [x] Add coverage badges to README
    -   [x] Set up coverage reports in CI

## 🔍 Code Quality & Linting

-   [x] Fully enable Biome linter (currently disabled)
-   [x] Remove ESLint and all ESLint dependencies
-   [x] Remove all Babel dependencies:
    -   [x] @babel/cli
    -   [x] @babel/core
    -   [x] @babel/preset-env
    -   [x] @babel/preset-flow
    -   [x] babel-eslint
    -   [x] babel-loader
    -   [x] babel-plugin-add-module-exports
    -   [x] babel-plugin-dev-expression
-   [x] Configure Biome rules appropriately
-   [x] Update biome.json to enable linter with proper rules
-   [x] Add pre-commit hooks with Husky
-   [x] Add lint-staged for pre-commit linting
-   [x] Add pre-push hook to run tests

## 📘 TypeScript Configuration

-   [x] Update TypeScript from 4.3.5 to 5.7+
-   [x] Update tsconfig.json compiler target from ES5 to ES2020+
-   [x] Add `"module": "ESNext"` to tsconfig.json
-   [x] Add `"moduleResolution": "bundler"` to tsconfig.json
-   [x] Enable all strict mode flags
-   [x] Add `"verbatimModuleSyntax": true` for better ESM
-   [x] Add `"declarationMap": true` for better debugging
-   [x] Update lib to include latest ES features
-   [x] Remove unnecessary @types packages after cleanup
    -   [x] Remove `@types/jest` (using Vitest now)
    -   [x] Remove `@types/mocha` (removed Mocha)
    -   [x] Remove `@types/karma` (removed Karma)
-   [x] Consider adding path aliases for cleaner imports
-   [x] Add `paths` configuration for @/ imports (optional)

## 📦 Dependency Management

-   [x] Update runtime requirement to Bun >=1.0.0
-   [x] Add `"packageManager"` field to package.json (bun)
-   [x] Remove legacy polyfills:
    -   [x] es6-promise
    -   [x] js-polyfills
-   [x] Remove unused dev dependencies:
    -   [x] chromeless
    -   [x] appium-ios-simulator (if not actively used)
    -   [x] uglify-js
    -   [x] uglifyjs-webpack-plugin
    -   [x] webpack
    -   [x] webpack-cli
    -   [x] karma and all karma-\* packages
    -   [x] mocha
    -   [x] standard-version
-   [x] Update all @types packages to latest versions
-   [x] Update remaining dependencies to latest compatible versions
-   [x] Add modern dependencies:
    -   [x] vitest
    -   [x] @vitest/ui
    -   [x] playwright or @playwright/test
    -   [x] @changesets/cli
    -   [x] husky
    -   [x] lint-staged
    -   [ ] tsup or vite (if replacing rollup)

## 📄 Package Configuration

-   [x] Add `"type": "module"` to package.json for native ESM
-   [x] Add proper `"exports"` field with ESM/CJS mappings
-   [x] Remove `"browser"` field (redundant with exports)
-   [x] Update `"main"` to point to CJS output
-   [x] Update `"module"` to point to ESM output
-   [x] Ensure `"types"` or `"typings"` points to correct .d.ts
-   [x] Add `"sideEffects": false` if applicable
-   [x] Update package.json scripts:
    -   [x] Rename/reorganize for clarity
    -   [x] Add `dev` script for development
    -   [x] Update build scripts for new bundler
    -   [x] Update test scripts for Vitest
    -   [x] Update lint scripts for Biome

## 🗂️ Project Structure

-   [x] Add VS Code workspace settings
    -   [x] Add `.vscode/settings.json` with Biome config
    -   [x] Add `.vscode/extensions.json` with recommended extensions
    -   [x] Add debug configurations
-   [x] Add `CODEOWNERS` file for GitHub
-   [x] Consider adding `SECURITY.md`
-   [x] Remove or update karma.conf.js (file still exists but Karma is removed)
-   [x] Add dependabot or renovate config for automated dependency updates

-   [x] Create `.husky/` directory for git hooks
-   [x] Add `.editorconfig` file if missing
-   [x] Create or update `.github/workflows/` for CI/CD
-   [ ] Move all config files to `config/` directory (optional)
-   [x] Add `CONTRIBUTING.md` if not present
    -   [x] Consider converting remaining .js scripts to .ts
    -   [x] Update scripts/create-reftests.js if still needed
    -   [x] Update scripts/parse-reftest.js if still needed
-   [ ] Update to use async/await consistently
-   [x] Remove IE9 support mentions and code
-   [x] Update browser compatibility targets
-   [ ] Use optional chaining (?.) where applicable
-   [ ] Use nullish coalescing (??) where applicable
-   [ ] Leverage modern ES2020+ features:
    -   [ ] Private class fields
    -   [ ] Promise.allSettled
    -   [ ] String.prototype.matchAll
    -   [ ] BigInt (if needed)
    -   [ ] Top-level await
    -   [ ] Array.prototype.at()
-   [ ] Review and update error handling patterns
-   [ ] Add proper types for all function parameters/returns
-   [ ] Refactor to use Web APIs where appropriate
-   [ ] Update examples to use modern JavaScript
    -   [ ] Update demo.html
    -   [ ] Update demo2.html
    -   [ ] Update existing_canvas.html
-   [ ] Remove any unused exports
-   [ ] Apply consistent code style across codebase
-   [ ] Use nullish coalescing (??) where applicable
-   [ ] Leverage modern ES2020+ features:
    -   [ ] Private class fields
    -   [ ] Promise.allSettled
    -   [ ] String.prototype.matchAll
    -   [ ] BigInt (if needed)
-   [ ] Review and update error handling patterns
-   [ ] Add proper types for all function parameters/returns

-   [ ] Add API documentation using TypeDoc or similar
-   [ ] Create comprehensive JSDoc comments
-   [ ] Add usage examples for common scenarios
-   [ ] Document all public APIs
-   [ ] Add troubleshooting section to README
-   [ ] Create CHANGELOG.md if not using Changesets changelog

## 🎯 Output & Build Artifacts

-   [ ] Ensure proper dual CJS/ESM builds
-   [ ] Generate source maps with sourceRoot
-   [ ] Add declarationMap for .d.ts files
-   [ ] Optimize for tree-shaking
-   [ ] Test bundle size and optimize
-   [ ] Ensure proper exports for bundlers
-   [ ] Add package exports conditions (import/require/types)

## 📚 Documentation Updates

-   [ ] Update README.md with new browser requirements
-   [ ] Remove references to IE9, old browser versions
-   [ ] Update build instructions
-   [ ] Update development setup instructions
-   [ ] Document new test running commands
-   [ ] Update contribution guidelines
-   [ ] Add migration guide if breaking changes
-   [ ] Update examples if API changes

## 🔄 Version Control & Release

-   [x] Replace standard-version with Changesets
-   [x] Set up Changesets workflow
-   [x] Add .changeset directory
    -   [x] Create CI workflow for Bun
    -   [ ] Add matrix testing for multiple Bun versions
    -   [x] Add caching for bun dependencies
-   [ ] Add automated testing in CI
    -   [ ] Run Vitest tests
    -   [ ] Run Playwright tests
    -   [ ] Generate coverage reports
-   [ ] Add build verification in CI
-   [ ] Add mutation testing (optional)
-   [ ] Test package installation from npm
-   [ ] Verify source maps work correctly
-   [ ] Test with different bundlers (webpack, vite, rollup, esbuild)
-   [ ] Test CommonJS and ESM imports in Node/Bun
-   [ ] Verify tree-shaking works properly

## 🔐 Security & Maintenance

-   [ ] Audit dependencies for vulnerabilities
-   [ ] Set up automated security updates
-   [ ] Add security policy (SECURITY.md)
-   [ ] Review and update permissions
-   [ ] Add license scanning
-   [ ] Document security best practices
-   [ ] Set up npm audit in CI

## 🎨 Developer Experience Improvements

-   [ ] Add better error messages
-   [ ] Improve TypeScript IntelliSense
-   [ ] Add development mode with better debugging
-   [ ] Create starter templates or examples
-   [ ] Add interactive documentation (Storybook or similar)
-   [ ] Improve local development server
-   [ ] Add hot module replacement for dev mode
-   [ ] Create debugging guide
-   [ ] Add bundle size checks
-   [ ] Configure automated releases
    -   [ ] Set up Changesets GitHub Action
    -   [ ] Configure NPM publishing
    -   [ ] Add release notes automation
-   [ ] Set up PR preview builds (optional)
-   [ ] Add security scanning
    -   [ ] Add Snyk or Dependabot alerts
    -   [ ] Add CodeQL analysis
    -   [ ] Scan for vulnerabilities in dependencies
-   [ ] Add performance benchmarking in CI
-   [ ] Add Lighthouse CI for web performance

-   [ ] Run full test suite after each major change
-   [ ] Verify builds work correctly
-   [ ] Test in multiple browsers
-   [ ] Test published package locally
-   [ ] Verify TypeScript definitions work
-   [ ] Check bundle size impact
-   [ ] Ensure backward compatibility or document breaks
-   [ ] Performance testing and benchmarks

## 🚀 Deployment & CI/CD

-   [ ] Update GitHub Actions workflows
-   [ ] Add automated testing in CI
-   [ ] Add build verification in CI
-   [ ] Add bundle size checks
-   [ ] Configure automated releases
-   [ ] Set up PR preview builds (optional)

## 📊 Priority Order

### Phase 1: Foundation (High Priority)

1. Update TypeScript and Node version requirements
2. Configure Biome fully and remove ESLint
3. Remove Babel entirely
4. Update package.json structure and exports

### Phase 2: Testing (High Priority)

1. Replace Karma with Playwright
2. Migrate Jest to Vitest
3. Update all test scripts
4. Verify all tests pass

### Phase 3: Build System (Medium Priority)

1. Evaluate and implement new bundler (Vite/tsup)
2. Remove Webpack and UglifyJS
3. Update build scripts
4. Verify build outputs

### Phase 4: Code Modernization (Medium Priority)

1. Convert to ESM throughout
2. Update code to use modern JavaScript features
3. Remove legacy browser support code
4. Improve type safety

### Phase 5: Developer Experience (Lower Priority)

1. Add git hooks with Husky
2. Set up Changesets
3. Improve documentation
4. Enhance CI/CD pipeline

---

## Notes

-   Test thoroughly after each phase
-   Consider semantic versioning for breaking changes
-   Communicate changes to users/contributors
-   Create migration guide if needed
-   Keep backward compatibility where possible
