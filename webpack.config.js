const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'react-google-optimize.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|example|build)/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /(node_modules|example|build)/
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react'
    }
  }
};
