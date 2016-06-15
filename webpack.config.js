/**
 * Created by tapes on 2015/6/30.
 */

'use strict';

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'index': './app/index.js'
    },
    output: {
        path: './',
        filename: './www/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, loader: "raw-loader"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : 'app/template.html',
            filename: './www/index.html'
        })
    ],
    devtool: '#inline-source-map'
};