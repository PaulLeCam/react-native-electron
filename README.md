# React Native Electron [![Build Status](https://img.shields.io/travis/PaulLeCam/react-native-electron/master.svg)](https://travis-ci.org/PaulLeCam/react-native-electron) [![npm version](https://img.shields.io/npm/v/react-native-electron.svg)](https://www.npmjs.com/package/react-native-electron)

[Electron](https://www.electronjs.org) extensions to [React Native for Web](https://github.com/necolas/react-native-web)

## Introduction

This project aims to provide extensions to [React Native for Web](https://github.com/necolas/react-native-web) targeted to the [Electron](https://www.electronjs.org) environment to support additional modules exposed by React Native (ex Clipboard, WebView) using Electron APIs.

This is very early stage, not fully tested, and APIs will likely change between releases, so don't use this library if you need something stable.

## Installation

```sh
npm install react-native-electron
```

`electron`, `react` and `react-native-web` are required peer dependencies, make sure to install them as well:

```sh
npm install electron react react-native-web
```

`react-art` is also needed if you use `ART`.

## Example

See the `example` directory for the source code and Webpack config.

To run the demo app, fork this repository and run:

- `npm install`
- `npm run example:server`
- In another terminal instance, `npm run example:electron`

## Usage with Expo application

This module can be used with Expo application (created by `expo-cli`) using the following steps:

- Follow [this guide's](https://docs.expo.io/guides/using-electron/) setup
- Run `yarn expo-electron customize` in order to eject expo-electron's webpack configuration
- Edit `./electron/webpack.config.js` as follows:

```
const { withExpoWebpack } = require('@expo/electron-adapter');

module.exports = config => {
	let expoConfig = withExpoWebpack(config);
	
	expoConfig.resolve.alias['react-native$'] = 'react-native-electron';
	
	return expoConfig;
};

```

Note this is a partial solution, as Expo's default webpack configuration includes more aliases to `react-native`, but it should cover all of `react-native-electron`'s APIs.

## APIs

### Alert

[React Native's Alert](https://reactnative.dev/docs/alert.html) implementation using [Electron's dialog](https://www.electronjs.org/docs/api/dialog/)

```
Alert.alert(
  title: string,
  message: ?string,
  buttons: ?Array<{text: string, onPress?: () => void}> = [],
  type: ?('none' | 'info' | 'error' | 'question' | 'warning') = 'none'
): void
```

### Appearance

[React Native's Appearance](https://reactnative.dev/docs/appearance.html) implementation using [Electron's nativeTheme](https://www.electronjs.org/docs/api/native-theme/)

```
Appearance.getColorScheme(): 'light' | 'dark' | null
```

### Clipboard

[React Native's Clipboard](https://reactnative.dev/docs/clipboard.html) implementation using [Electron's clipboard](https://www.electronjs.org/docs/api/clipboard/).

`Clipboard.getString(type: ?string): Promise<?string>`

`Clipboard.setString(text: string, type: ?string): void`

### Linking

[React Native's Linking](https://reactnative.dev/docs/linking.html) implementation using Electron's [app](https://www.electronjs.org/docs/api/app/) and [shell](https://www.electronjs.org/docs/api/shell/) APIs.

`Linking.openURL(url: string): Promise<void>`

`Linking.addEventListener(type: string, handler: Function): void`

`Linking.removeEventListener(type: string, handler: Function): void`

`Linking.canOpenURL(): Promise<true>`: always resolves to `true`

`Linking.getInitialURL(): Promise<?string>`: resolves with the `process.argv[1]` value, expecting the app to be opened by a command such as `myapp myapp://test`

## Hooks

`useColorScheme(): 'light' | 'dark' | null`

## License

MIT  
See [LICENSE](LICENSE) file.
