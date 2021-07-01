const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
        filename:'css/[name].css',
    }),],
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "./src"),
    entry: {
        index: "./js/index.js",
        about: "./js/about.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
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
                presets: ['@babel/preset-env'],
                "plugins": ["@babel/plugin-proposal-class-properties"]
              }
            }
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