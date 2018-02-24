/**
 * @file actions
 **/
/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, './development/main.js'),
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '',
        filename: '[hash:8].bundle.js',
    },

    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                } //将react编译成js文件
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true //css压缩
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            indent: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    broswer: 'last 5 versions'
                                })
                            ]
                        }
                    }]
                })
            },
            //打包css文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                indent: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        broswer: 'last 5 versions'
                                    })
                                ]

                            },
                        },
                        "sass-loader"
                    ]
                })
            },
            //编译sass文件
            {
                test: /\.(png|jpg)$/,
                use: ['url-loader?limit=8192&name=img/[hash:8].[name].[ext]']
            }
            //对图片进行打包
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.[contenthash:6].css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'development/index.html'),
            title: 'test',
            filename: 'index.html',
        })
    ]
};