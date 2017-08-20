import path from 'path'
import webpack from 'webpack'

export default {
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, 'app/renderer.js'),
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
      'react-native': path.join(__dirname, '../src'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: 'http://localhost:7000/build',
  },
  target: 'electron-renderer',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: __dirname,
    hot: true,
    inline: true,
    overlay: true,
    port: 7000,
    stats: {
      cached: false,
    },
  },
}
