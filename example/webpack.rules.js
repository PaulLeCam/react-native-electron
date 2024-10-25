module.exports = [
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: true,
          },
        },
        env: {
          targets: 'Electron >= 33',
        },
      },
    },
  },
  {
    test: /\.node$/,
    use: 'node-loader',
  },
]
