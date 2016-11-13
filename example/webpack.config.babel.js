import path from 'path'
import webpack from 'webpack'

export default {
  debug: true,
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, 'app/renderer.js'),
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }],
            }],
          ],
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': path.join(__dirname, '../src'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: 'http://localhost:7000/build',
  },
  target: 'electron',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    colors: true,
    contentBase: __dirname,
    hot: true,
    inline: true,
    port: 7000,
    progress: true,
    stats: {
      cached: false,
    },
  },
}
