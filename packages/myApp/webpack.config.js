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
    publicPath: "http://localhost:5005/",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  devServer: {
    port: 5005,
    watchContentBase: true,
    historyApiFallback: true,
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
      name: 'myApp',
      remotes: {
        shell: "shell@http://localhost:5002/remoteEntry.js",
        about: 'about@http://localhost:5001/remoteEntry.js',
        home: 'home@http://localhost:5000/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};