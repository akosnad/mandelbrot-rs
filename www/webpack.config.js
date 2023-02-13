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
      patterns: [
        { from: "index.html", to: "." },
        //        { from: "worker.js", to: "." },
      ],
    }),
  ],
  module: {
    rules: [
      /*
      {
        test: /worker\.js$/i,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true,
            },
          },
        ],
      },
      */
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
};
