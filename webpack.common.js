module.exports = {
  entry: { main: './src/index.js' },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
          // options: { name: '[name].[hash].[ext]', outputPath: 'img' }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        use: ['file-loader']
      }
    ]
  },

  resolve: { extensions: ['*', '.js', '.jsx'] }
};
