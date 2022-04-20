const { merge } = require("webpack-merge");
const base = require("./webpack.base.config");
const webpack = require("webpack");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = merge(base, {
  mode: "production",

  plugins: [
    new CompressionWebpackPlugin({
      //gzip 压缩
    //   asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        ".(js|css)$" //压缩 js 与 css
      ),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]
});
