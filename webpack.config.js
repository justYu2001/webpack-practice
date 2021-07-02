const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
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
            chunks: ["vendor", "index"]
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
            include: path.resolve(__dirname, "src/scss"),
            exclude: path.resolve(__dirname, "node_modules"),
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
            },
          },
          {
              test: /\.pug$/i,
              use: "pug-loader",
              include: path.resolve(__dirname, "src/view"),
            exclude: path.resolve("node_modules"),
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
    optimization: {
        moduleIds: 'deterministic',
        minimize: true,
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
              name: 'vendor',
            },
          },
        },
        runtimeChunk: {
            name: entrypoint => `runtimechunk~${entrypoint.name}`
         },
      },
}