const path = require("path");
const Htmlwebpackplugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(
      {
        uglifyOptions: {
          compress: {
            inline: 1, // this right here
            // keep_fnames: true
          },
          mangle: {
            // keep_fnames: true
          }
        }
      }
    )],
  },
  mode:'production',
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: ["babel-loader"],
            exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: [MiniCssExtractPlugin.loader,'css-loader']
        },
        {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
            ]
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: 'url-loader',
          },
        },
        ]
  },
  plugins: [
    new TerserPlugin(),
    new Htmlwebpackplugin({
      template: path.join(__dirname, "/src/index.html"),
      filename: "index.html",
      inject: "body",
      //favicon: "./src/images/favicon-32x32.png"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
  }),
  new CleanWebpackPlugin({
    cleanAfterEveryBuildPatterns: ['dist']
  })
  ]
};