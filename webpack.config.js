const webpack = require('webpack')
require('dotenv/config')

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    publicPath: `http://localhost:${process.env.PORT ?? 8080}/`,
  },

  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: process.env.PORT ?? 8080,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "nameOfModuleFederation",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),
  ],
}