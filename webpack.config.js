/**
 * @file actions
 **/
/* eslint-disable */
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
    // new HttpPushWebpackPlugin({
    //     receiver: 'http://huangwenbin.fis.bjh.otp.baidu.com/fis/reciever', // 服务端文件上传接口
    //     token: 'token', // 验证token
    //     to: '/home/work/orp/template/bjh-strategy-fe' // 上传文件目录
    // })
)

module.exports = config;