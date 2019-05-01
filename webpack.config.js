"use strict";

const debugging = process.env.NODE_ENV === "development";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  devtool: debugging ? "inline-sourcemap" : "sourcemap",
  entry: ["./src/mde.js", "./src/sass/mde.scss"],
  output: {
    path: __dirname,
    filename: "./dist/mde.min.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "dist/mde.min.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
};
