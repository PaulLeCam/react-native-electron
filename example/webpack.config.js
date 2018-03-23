const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'app', 'renderer.js'),
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, '..', 'src'),
    },
  },
  output: {
    filename: 'bundle.js',
  },
  target: 'electron-renderer',
  serve: {
    content: [path.resolve(__dirname, 'app')],
    port: 7000,
  },
}
