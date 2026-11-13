# Raindrop.io (AutoClose)

A personal fork of [Raindrop.io](https://github.com/raindropio/app) with a small customization for the Chrome extension.

## Official version

The AutoClose build is based on the official Raindrop.io version **5.8.2**.

Official project: [raindropio/app](https://github.com/raindropio/app)

## Modification

### Automatically close the popup after saving

The Chrome extension automatically closes the popup window after a bookmark has been successfully saved.

The modification detects the draft status transition from `saving` to `loaded` and closes the popup when the save operation is complete.

## Permissions

### Raindrop.io API access

The extension communicates with the Raindrop.io API (`https://api.raindrop.io`) using the browser's existing login session.

The API's CORS policy allows the official Raindrop.io extension ID, but may reject requests from unofficial builds that use a different extension ID. In that case, API requests can fail even when the user is logged in.

The manifest declares this optional host permission:

```json
"optional_host_permissions": [
  "*://*/*"
]
```

Granting this permission allows the extension to access the Raindrop.io API from an unofficial build.

**Current workaround:** There is currently no dedicated UI for requesting this permission. It can be granted through the **Add Highlight** action:

1. Open the Raindrop.io extension menu.
2. Select **Add Highlight**.
3. Grant the requested site access permission when prompted.

This grants access to websites in general, not only to the Raindrop.io API.

> **Note:** This is a workaround rather than an ideal permission flow. A dedicated permission request UI or an upstream change would be preferable.

## Versioning

This modified build uses the fourth version component to identify AutoClose revisions:

- Official `5.8.2` → AutoClose `5.8.2.1`
- Further AutoClose updates based on the same official version increment the fourth component.

If the official project ever adopts a four-component version that conflicts with this scheme, the versioning scheme will be revised.

## Build

Be sure to run `npm i` before calling any commands below.

| target   | command | notes |
|----------|---------|-------|
| web      | `npm run build` |
| electron | `npm run build:electron` |
| chrome   | `npm run build:extension:chrome` |
| edge     | `npm run build:extension:edge` |
| firefox  | `npm run build:extension:firefox` | Saved to `dist/firefox/prod` |
| opera    | `npm run build:extension:opera` |
| safari   | `npm run build:extension:safari` | Then open **build/xcode** project

## Development

| target   | command | notes |
|----------|---------|-------|
| web      | `npm run local` |
| chrome   | `npm run local:extension:chrome` | Turn off `same-site-by-default-cookies` in Chrome browser flags

### Reset Safari extension state (dev purpose only)

Danger removes all safari settings!!!

```sh
rm -rf ~/Library/Containers/com.apple.Safari/Data/Library/Safari/*
rm -rf ~/Library/Containers/com.apple.Safari/Data/Library/WebKit/*
rm -rf ~/Library/Developer/Xcode/DerivedData/Save_to_Raindrop.io-*(N)
defaults delete com.apple.Safari 2>/dev/null
```

## Supported browsers

- Chrome >= 67 - older versions not support SameSite cookie
- Safari >= 11 (OS X 10.11) - older version not support JS Rest in objects
- Firefox >= 55 - older version not support JS Rest in objects
- Edge >= 80 - earlies Blink version

## Notes

This is a personal modification and may require updates if the upstream implementation changes.

The automated GitHub Release publishes the Chrome extension ZIP only.
