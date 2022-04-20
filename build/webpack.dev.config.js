const {merge} = require('webpack-merge');
const base = require('./webpack.base.config');
const webpack = require('webpack');
const path = require("path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  

module.exports=merge(base,{
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, "dist"),
        open: true,
        port: 8880,
        hot: true,
        historyApiFallback: true,
      },
})
