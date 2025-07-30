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
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
        env: {
          targets: 'Electron >= 35',
        },
      },
    },
  },
  {
    test: /\.node$/,
    use: 'node-loader',
  },
]
