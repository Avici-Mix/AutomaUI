const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: false,
  entry: "./src/index.js",
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preLoaders: {
            i18n: 'yaml-loader'
          },
          loaders: {
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
};
