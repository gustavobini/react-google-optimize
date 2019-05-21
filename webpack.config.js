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
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|example|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
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
