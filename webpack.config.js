const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "./src"),
    entry: {
        index: "./index.js",
        about: "./about.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    }
}