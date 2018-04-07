const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./server/index.ts"],
  target: "node",
  externals: [nodeExternals()],
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
          path.join(__dirname, "server"),
          path.join(__dirname, "common")
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    // new webpack.DefinePlugin({
    //   "process.env": { BUILD_TARGET: JSON.stringify("server") }
    // })
  ],
  output: { path: path.join(__dirname, "dist"), filename: "server.js" }
};
