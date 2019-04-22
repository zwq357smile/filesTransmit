'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './node/index.js'
  },
  output: {
    filename: './node/[hash]app.js'
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('node')]
      }
    ]
  }
};
