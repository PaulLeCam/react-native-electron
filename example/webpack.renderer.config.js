module.exports = {
  target: 'web',
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    alias: {
      'react-native': require('node:path').resolve(__dirname, '../library'),
    },
  },
}
