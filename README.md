# Angular Liquid Glass Docs

Documentation and showcase app for `angular-liquid-glass`.

## Modes

The docs app can run in two modes:

- published package mode, using `angular-liquid-glass` from npm
- local development mode, using the sibling library workspace build output

## Install

```bash
npm install
```

## Run With Published Package

```bash
npm start
```

## Run With Local Library

This mode expects the library workspace at `../../angular-liquid-glass`.

```bash
npm run start:local
```

If you want to keep rebuilding the library while working on the docs:

Terminal 1:

```bash
cd ../../angular-liquid-glass
npm run watch
```

Terminal 2:

```bash
npm run start:local
```

In local mode, the Angular build uses `tsconfig.app.local.json` to resolve the package name
`angular-liquid-glass` to `../../angular-liquid-glass/dist/angular-liquid-glass`.

## Build

Local production build:

```bash
npm run build
```

Build against the local sibling library:

```bash
npm run build:local
```

GitHub Pages build:

```bash
npm run build:pages
```

## GitHub Pages

This project is configured to deploy to GitHub Pages from the repository root path:

```txt
/angular-liquid-glass-docs/
```

The workflow is defined in `.github/workflows/deploy-pages.yml`.
