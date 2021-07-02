const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/[name].css',
        }),
        new CopyPlugin({
            patterns: [
              { from: "assets", to: "assets" },
            ],
        }),
        new HtmlWebpackPlugin({
            title: "webpack practice",
            filename: "index.html",
            template: "index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            title: "pug loader practice",
            filename: "about.html",
            template: "./view/about.pug",
            chunks: ["about"]
        }),
    ],
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "./src"),
    entry: {
        index: "index",
        about: "about"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "src/scss"),
            path.resolve(__dirname, "src/js"),
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "src/view"),
        ],
        extensions: [".js"],
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            "postcss-preset-env", {},
                          ],
                        ],
                      },
                    },
                },
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            "postcss-preset-env", {},
                          ],
                        ],
                      },
                    },
                },
                "sass-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                    ['@babel/preset-env',{
                        useBuiltIns: 'entry',
                        corejs: 3,
                        }
                    ]
                ],
                plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
              }
            }
          },
          {
              test: /\.pug$/i,
              use: "pug-loader",
          }
        ],
      },
    devServer:{
        contentBase: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 9000,
        open: 'Google Chrome',
        hot: true,
    },
}