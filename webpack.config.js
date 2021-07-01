const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "./src"),
    entry: "./hello-world/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index-bundel.js",
    }
}