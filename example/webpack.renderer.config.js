module.exports = {
  target: 'web',
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    alias: {
      'react-native': require('path').resolve(__dirname, '../src'),
    },
  },
}
