var path = require('path')
var webpack = require('webpack')
var alias = require('../alias')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

var bubleOptions = {
  target: { chrome: 52, firefox: 48 },
  objectAssign: 'Object.assign'
}

module.exports = {
  entry: {
    devtools: './src/devtools.js',
    backend: './src/backend.js',
    hook: './src/hook.js'
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: '[name].js',
  },
  externals:{
    'neutronium_listener' : '__neutronium_listener__'
  },
  resolve: {
    alias: Object.assign({}, alias, {
      vue$: 'vue/dist/vue.common.js'
    })
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules|vue\/dist|vuex\/dist/,
        options: bubleOptions
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          buble: bubleOptions
        }
      },
      {
        test: /\.(png|woff2)$/,
        loader: 'url-loader?limit=0'
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyPlugin()
  ],
  devtool: '#cheap-module-source-map',
  devServer: {
    quiet: true
  }
}
