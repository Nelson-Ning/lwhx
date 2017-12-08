var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './development/main.js')],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        loaders: [{
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                } //将react编译成js文件
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            //打包css文件
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            //编译sass文件
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
            //对图片进行打包
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};