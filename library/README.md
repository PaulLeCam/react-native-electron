# React Native Electron

[Electron](https://www.electronjs.org) extensions to [React Native for Web](https://necolas.github.io/react-native-web/)

## Introduction

This project aims to provide extensions to [React Native for Web](https://necolas.github.io/react-native-web/) targeted to the [Electron](https://www.electronjs.org) environment to support additional modules exposed by React Native (`Alert`) or alternative implementations (`Linking`) using Electron APIs.

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
- `BrowserWindow` instances must be created with the `preload` script from `react-native-electron/preload`, for example:

```js
webPreferences: {
  preload: require('node:path').resolve(
    require.resolve('react-native-electron/preload'),
  ),
},
```

## Example

See the `example` directory for the source code and Webpack config.

To run the demo app, fork this repository and run the following commands in the root folder:

- `pnpm install`
- `pnpm run build`
- `pnpm start`

## React Native APIs

These APIs mostly match React Native APIs, possibly with additional exports or options specific to Electron. They are exported by the main `react-native-electron` module.

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

### Platform

[React Native's Platform](https://reactnative.dev/docs/platform.html)

`Platform.isElectron: boolean`

`Platform.OS: string`

`Platform.nativeOS: string`

```ts
Platform.select(
  win32?: any,
  linux?: any,
  darwin?: any,
  electron?: any,
  web?: any,
  default?: any
): any
```

## Additional APIs

These modules provide additional functionalities not part of the main React Native APIs.

### Clipboard

Theses APIs provide interactions with the system's clipboard using [Electron's `clipboard` module](https://www.electronjs.org/docs/latest/api/clipboard). They are exported by the `react-native-electron/clipboard` module.

`getString(): Promise<string>`

`setString(value: string): Promise<void>`

## License

MIT  
See [LICENSE](LICENSE) file.
