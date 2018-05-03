var path = require('path');
var webpack = require('webpack');
const config = require('./webpack.base.config');
//var HttpPushWebpackPlugin = require('http-push-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
var proxy = require('http-proxy-middleware');

config.devServer = {
    inline: true,
    historyApiFallback: true, //不跳转
    noInfo: true,
    port: 8888,
    proxy: [{
        context: [`/api/*/*`],
        target: 'http://localhost:8080/',
        changeOrigin: true,
        secure: false
    }]
}

config.devtool = 'source-map';
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
)

module.exports = config;