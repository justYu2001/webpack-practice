const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            axios: "axios"
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
            path.resolve(__dirname, "node_modules")
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
              test: /\.html$/i,
              use: [{
                  loader: "file-loader",
                  options: {
                      name: "[path][name].[ext]",
                  }
              }]
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
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  disable: true,
                },
              },
            ],
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