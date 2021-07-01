const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "./src"),
    entry: {
        index: "./js/index.js",
        about: "./js/about.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
}