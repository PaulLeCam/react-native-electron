const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'app', 'renderer.js'),
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
      'react-native': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    filename: 'bundle.js',
  },
  target: 'electron-renderer',
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    port: 7000,
  },
}
