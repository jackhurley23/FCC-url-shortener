const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./client/index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: true
            }
          },
          "awesome-typescript-loader"
        ],
        include: [
          path.join(__dirname, "client"),
          path.join(__dirname, "common")
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [new webpack.NamedModulesPlugin()]
};
