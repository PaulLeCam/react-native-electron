## v0.20.0 (2024-10-25)

- Updated Electron dependency to v33.0.
- Refactored setup.

## v0.19.0 (2023-04-09)

- Updated React Native for Web dependency to v0.19.
- Updated Electron dependency to v24.0.

## v0.18.0 (2022-08-06)

- Updated React dependency to v18.
- Updated React Native for Web dependency to v0.18.
- Updated Electron dependency to v20.0.

## v0.17.0 (2022-02-26)

- Updated Electron dependency to v17.0.
- Added `Platform` API
  ([PR #26](https://github.com/PaulLeCam/react-native-electron/pull/26) by
  [hans00](https://github.com/hans00)).

## v0.16.0 (2021-11-14)

- Updated React Native for Web dependency to v0.17.
- Updated Electron dependency to v15.0.
- Updated internal logic to work with Electron's context isolation.

## v0.15.0 (2021-02-17)

- Updated React Native for Web dependency to v0.15, that now has a peer
  dependency on React v17.0.
- Updated Electron dependency to v11.0.
- Removed custom `Appearance` and `Clipboard` APIs and `useColorScheme` hook,
  instead exporting the React Native Web implementation.
- Updated logic to no longer require `webPreferences.nodeIntegration` to be set
  to `true` in Electron's `BrowserWindow` options.

## v0.14.0 (2020-07-11)

- Updated React Native for Web dependency to v0.13.
- Updated Electron dependency to v9.0.

## v0.13.0 (2020-04-04)

- Updated Electron dependency to v8.0.
- Added `Appearance` API and `useColorScheme` hook introduced in React Native
  v0.62.

## v0.12.0 (2020-01-30)

- Updated React Native for Web dependency to v0.12.
- Updated Electron dependency to v7.0.
- Removed `WebView` component as it's been removed from React Native.

## v0.11.0 (2019-03-17)

- Updated React Native for Web dependency to v0.11.
- Removed `ART` export as it's been removed from React Native for Web.

## v0.10.0 (2019-01-31)

- Updated Electron dependency to v4.0.
- Updated React Native for Web dependency to v0.10.

## v0.9.0 (2018-09-20)

Updated Electron dependency to v3.0.

## v0.8.0 (2018-09-17)

- Updated React Native for Web dependency to v0.9.
- Updated Babel to v7.

## v0.7.0 (2018-06-05)

Updated React Native for Web dependency to v0.8.

## v0.6.0 (2018-05-23)

- Updated Electron dependency to v2.0.
- Updated React Native for Web dependency to v0.7.

## v0.5.1 (2018-04-20)

Fixed missing export of `StatusBar` component.

## v0.5.0 (2018-04-20)

Updated React Native for Web dependency to v0.6.

## v0.4.2 (2018-03-23)

- Updated Electron dependency to v1.8.4 to include the
  [webview vulnerability fix](https://electronjs.org/blog/webview-fix).
- Updated example to webpack 4 and webpack-serve.

## v0.4.1 (2018-02-22)

Fixed `canOpenURL()` and `getInitialURL()` returning promises in Linking module.

## v0.4.0 (2018-02-20)

- Updated Electron dependency to v1.8.
- Updated React Native for Web dependency to v0.5.

## v0.3.0 (2018-01-09)

Updated dependency to React Native for Web v0.3.

## v0.2.0 (2017-12-21)

Updated dependency to React Native for Web v0.2.

## v0.1.1 (2017-11-17)

Updated dependency to React Native for Web v0.1.14.

## v0.1.0 (2017-09-28)

First minor release following React v16 and React Native for Web v0.1 releases.
