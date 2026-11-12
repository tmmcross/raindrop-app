# Raindrop.io AutoClose

A personal fork of [Raindrop.io](https://github.com/raindropio/app) that automatically closes the browser extension popup after a bookmark is successfully saved.

## Modification

The add-bookmark popup closes when the draft status changes from `saving` to `loaded`.
The upstream Escape-key behavior is retained.

## Versioning

The first three version components follow upstream. The fourth component identifies AutoClose revisions.

Example: upstream `5.8.5` → this fork `5.8.5.5`.

## Build

Install dependencies with `npm ci`, then build the Chromium extension:

```sh
npm run build:extension:chrome
```

The GitHub Actions workflow builds the extension and publishes a ZIP release.
