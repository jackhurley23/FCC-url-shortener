const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: ["webpack/hot/poll?1000", "./server/index.ts"],
  watch: true,
  target: "node",
  externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: true,
              plugins: ["react-hot-loader/babel"]
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
    new StartServerPlugin("server.js"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv()
    // new webpack.DefinePlugin({
    //   "process.env": { BUILD_TARGET: JSON.stringify("server") }
    // })
  ],
  output: { path: path.join(__dirname, ".build"), filename: "server.js" }
};
