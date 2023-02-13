const HTMLMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  experiments: {
    asyncWebAssembly: true,
  },
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "index.html", to: "." }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  stats: {
    children: true,
  },
  optimization: {
    minimizer: [new HTMLMinimizerPlugin()],
  },
};
