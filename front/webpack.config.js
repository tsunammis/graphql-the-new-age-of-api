'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.resolve('app')
const DIST_PATH = path.resolve('dist')

module.exports = {
  entry : `${APP_DIR}/app.jsx`,
  output : {
    path : DIST_PATH,
    filename : 'bundle.js'
  },
  module : {
    rules : [{
      test : /\.(js|jsx)$/,
      exclude: /node_modules/,
      use : 'babel-loader'
    }]
  },
  plugins : [
    new HtmlWebpackPlugin({ template : path.join(APP_DIR, 'index.html'), hash : true })
  ]
}
