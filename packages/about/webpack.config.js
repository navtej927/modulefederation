const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require('webpack').container;

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  cache: false,
  mode: "development",
  // output: {
  //   publicPath: "http://localhost:3001/",
  // },
  output: {
    publicPath: "http://localhost:5001/",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  devServer: {
    port: 5001,
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
      name: 'about',
      library: { type: 'var', name: 'about' },
      filename: 'remoteEntry.js',
      exposes: {
        // expose each component you want 
        './AboutApp': './src/app',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};