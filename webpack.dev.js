const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge('./webpack.common.js', {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['./src/template.html'],
    hot: true,
    open: true,
  },
});
