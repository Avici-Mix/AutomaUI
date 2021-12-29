const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      host: '0.0.0.0',
    },
    output: {
      filename: 'js/[name].[hash].js',
      path: path.resolve(__dirname, '../dist'),
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            // 'postcss-loader',
            'less-loader',
          ],
        },
      ],
    },
    mode: 'development',
  })
  