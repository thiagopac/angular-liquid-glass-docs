# Angular Liquid Glass Docs

This repository contains the documentation and showcase app for `angular-liquid-glass`.

- Live docs: https://thiagopac.github.io/angular-liquid-glass-docs/
- Library repo: https://github.com/thiagopac/angular-liquid-glass
- npm package: https://www.npmjs.com/package/angular-liquid-glass

## Purpose

The docs app exists to:

- demonstrate the current component set visually
- provide live usage examples for each component
- validate real-world integration against the published package
- support local side-by-side development with the library workspace

## Dependency Modes

The docs app supports two dependency modes:

- npm mode, which uses the published `angular-liquid-glass` package
- local mode, which resolves the package name to the sibling library build output

## Install

```bash
npm install
```

## Run With Published Package

Use the version declared in `package.json`:

```bash
npm start
```

## Run With Local Library

This mode expects the library workspace at `../../angular-liquid-glass`.

```bash
npm run start:local
```

If you want the docs to update while developing the library:

Terminal 1:

```bash
cd ../../angular-liquid-glass
npm run watch
```

Terminal 2:

```bash
npm run start:local
```

The local mode uses `tsconfig.app.local.json` to resolve:

```txt
angular-liquid-glass -> ../../angular-liquid-glass/dist/angular-liquid-glass
```

## Scripts

```bash
npm start
npm run start:local
npm run build
npm run build:local
npm run build:pages
npm test
```

## GitHub Pages

The app is configured to publish at:

```txt
/angular-liquid-glass-docs/
```

The deploy workflow lives in:

```txt
.github/workflows/deploy-pages.yml
```

Pushes to `main` and tags matching `v*.*.*` trigger a Pages deployment.

## Relationship To The Library

If you are looking for installation instructions, package API, contribution rules, or release process for the component library itself, use the main repository:

https://github.com/thiagopac/angular-liquid-glass
