var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/nuy.js',
    "mode": "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'nuy.js'
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};