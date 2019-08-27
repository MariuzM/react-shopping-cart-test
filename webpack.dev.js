const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  // target: 'web',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    stats: {
      all: false,
      modules: false,
      maxModules: 0,
      warnings: true,
      moduleTrace: true,
      timings: true,
      errors: true,
      errorDetails: true,
      outputPath: false
    },
    // stats: 'minimal',
    overlay: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
      // favicon: './src/favicon.ico'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});
