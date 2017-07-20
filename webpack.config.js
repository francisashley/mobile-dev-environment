"use strict";

const debugging = process.env.NODE_ENV === "development";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,
  devtool: debugging ? "inline-sourcemap" : "sourcemap",
  entry: [ "./src/mde.js", "./src/sass/mde.scss" ],
  output: {
    path: __dirname,
    filename: "./dist/mde.min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          "fallback": "style-loader",
          "use": "css-loader!sass-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("dist/mde.min.css")
  ]
};