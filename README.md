# React Native Electron [![Build Status](https://img.shields.io/travis/PaulLeCam/react-native-electron/master.svg)](https://travis-ci.org/PaulLeCam/react-native-electron) [![npm version](https://img.shields.io/npm/v/react-native-electron.svg)](https://www.npmjs.com/package/react-native-electron)

[Electron](https://www.electronjs.org) extensions to [React Native for Web](https://github.com/necolas/react-native-web)

## Introduction

This project aims to provide extensions to [React Native for Web](https://github.com/necolas/react-native-web) targeted to the [Electron](https://www.electronjs.org) environment to support additional modules exposed by React Native (`Alert`) or alternative implementations (`Linking`) using Electron APIs.

## Installation

```sh
npm install react-native-electron
```

`electron`, `react` and `react-native-web` are required peer dependencies, make sure to install them as well:

```sh
npm install electron react react-native-web
```

`react-art` is also needed if you use `ART`.

## Electron setup

In order for the APIs exposed by `react-native-electron` to be accessible in Electron's render process, the following setup must be applied:

- The `react-native-electron/main` module must be imported in the main process
- `BrowserWindow` instances must be created with the following `webPreferences` options:

```js
webPreferences: {
  contextIsolation: false,
  preload: require('path').resolve(
    require.resolve('react-native-electron/preload'),
  ),
},
```

## Example

See the `example` directory for the source code and Webpack config.

To run the demo app, fork this repository and run the following commands in the root folder:

- `npm install`
- `npm run build`

Then in the `example` folder:

- `npm install`
- `npm start`

## Usage with Expo application

This module can be used with Expo application (created by `expo-cli`) using the following steps:

- Follow [this guide's](https://docs.expo.io/guides/using-electron/) setup
- Run `yarn expo-electron customize` in order to eject expo-electron's webpack configuration
- Edit `./electron/webpack.config.js` as follows:

```js
const { withExpoWebpack } = require('@expo/electron-adapter')

module.exports = (config) => {
  const expoConfig = withExpoWebpack(config)
  expoConfig.resolve.alias['react-native$'] = 'react-native-electron'
  return expoConfig
}
```

Note this is a partial solution, as Expo's default webpack configuration includes more aliases to `react-native`, but it should cover all of `react-native-electron`'s APIs.

## APIs

### Alert

[React Native's Alert](https://reactnative.dev/docs/alert.html) implementation using [Electron's dialog](https://www.electronjs.org/docs/api/dialog/)

```js
Alert.alert(
  title: string,
  message: ?string,
  buttons: ?Array<{text: string, onPress?: () => void}> = [],
  type: ?('none' | 'info' | 'error' | 'question' | 'warning') = 'none'
): void
```

### Linking

[React Native's Linking](https://reactnative.dev/docs/linking.html) implementation using Electron's [app](https://www.electronjs.org/docs/api/app/) and [shell](https://www.electronjs.org/docs/api/shell/) APIs.

`Linking.openURL(url: string): Promise<void>`

`Linking.addEventListener(type: string, handler: Function): void`

`Linking.removeEventListener(type: string, handler: Function): void`

`Linking.canOpenURL(): Promise<true>`: always resolves to `true`

`Linking.getInitialURL(): Promise<?string>`: resolves with the `process.argv[1]` value, expecting the app to be opened by a command such as `myapp myapp://test`

## License

MIT  
See [LICENSE](LICENSE) file.
