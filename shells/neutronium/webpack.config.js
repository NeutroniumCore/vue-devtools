const path = require('path')
const createConfig = require('../createConfig')

const target = {
  chrome: 52,
  firefox: 48,
  safari: 9,
  ie: 11
}

module.exports = createConfig({
  entry: {
    hook: './src/hook.js',
    devtools: './src/devtools.js',
    backend: './src/backend.js',
  },
  externals: {
    'neutronium_listener': '__neutronium_listener__'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  devtool: false
}, target)
