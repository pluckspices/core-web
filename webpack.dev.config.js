const path = require("path");
const webpack = require("webpack");
const htmlwebpackplugin = require("html-webpack-plugin");
const dotenv = require("dotenv");

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      hot: true,
      index: "index.html",
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: "url-loader",
          },
        },
      ],
    },
    devtool: "cheap-module-source-map",
    plugins: [
      new htmlwebpackplugin({
        template: path.join(__dirname, "/src/index.html"),
        filename: "index.html",
        inject: "body",
        // favicon: "./src/images/favicon-32x32.png"
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
