var path = require('path');
var webpack = require('webpack');
const config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
var HttpPushWebpackPlugin = require('http-push-webpack-plugin');
config.output.publicPath = '/builder/aps/';
config.plugins.push(
    new uglify(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
)

module.exports = config;