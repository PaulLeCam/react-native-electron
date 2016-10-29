# React Native Electron

[Electron](http://electron.atom.io/) extensions to [React Native for Web](https://github.com/necolas/react-native-web)

## Introduction

This project aims to provide extensions to [React Native for Web](https://github.com/necolas/react-native-web) targeted to the [Electron](http://electron.atom.io/) environment to support additional modules exposed by React Native (ex Clipboard, WebView) using Electron APIs.

This is very early stage, not fully tested, and APIs will likely change between releases, so don't use this library if you need something stable.

## Installation

```sh
npm install react-native-electron
```

`electron`, `react` and `react-native-web` are required peer dependencies, make sure to install them as well:

```sh
npm install electron react react-native-web
```

## Example

See the `example` directory for the source code and Webpack config.

To run the demo app, fork this repository and run:

- `npm install`
- `npm run example:server`
- In another terminal instance, `npm run example:electron`

## APIs

### Alert

[React Native's Alert](https://facebook.github.io/react-native/docs/alert.html) implementation using [Electron's dialog](http://electron.atom.io/docs/api/dialog/)

```
Alert.alert(
  title: string,
  message: ?string,
  buttons: ?Array<{text: string, onPress?: () => void}> = [],
  type: ?('none' | 'info' | 'error' | 'question' | 'warning') = 'none'
): void
```

### Clipboard

[React Native's Clipboard](https://facebook.github.io/react-native/docs/clipboard.html) implementation using [Electron's clipboard](http://electron.atom.io/docs/api/clipboard/)

`Clipboard.getString(type: ?string): Promise<?string>`

`Clipboard.setString(text: string, type: ?string): void`

### Linking

[React Native's Linking](https://facebook.github.io/react-native/docs/linking.html) implementation using [Electron's shell](http://electron.atom.io/docs/api/shell/)

`Linking.openURL(url: string): Promise<void>`

## Components

### WebView

[React Native's WebView](https://facebook.github.io/react-native/docs/webview.html) implementation using [Electron's webview tag](http://electron.atom.io/docs/api/web-view-tag/)

**Props:**

- `source: {uri: string}`

## License

MIT  
See [LICENSE](LICENSE) file.
