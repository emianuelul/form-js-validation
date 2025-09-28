const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge('./webpack.common.js', {
  mode: 'production',
  devTool: 'source-map',
});
