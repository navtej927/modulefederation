const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require('webpack').container;
//const CopyPlugin = require("copy-webpack-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  cache: false,
  mode: "development",
  // output: {
  //   publicPath: "http://localhost:3001/",
  // },
  output: {
    publicPath: "http://localhost:5002/",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  devServer: {
    port: 5002,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: require.resolve("babel-loader"),
      }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      library: { type: 'var', name: 'shell' },
      filename: 'remoteEntry.js',
      exposes: {
        './Shell': './src/app',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};