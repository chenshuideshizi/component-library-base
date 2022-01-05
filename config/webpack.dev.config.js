const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const resolve = (p) => path.resolve(__dirname, '../example', p)
const baseConfig = require('./webpack.base.config')

module.exports =  merge(baseConfig, {
    mode: 'development',
    entry: {
        app: './example/src/main.js'
    },
    output: {
        filename: '[name].js',
        path: resolve('./dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        open: true,
        port: 9999
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./public/index.html'),
            filename: resolve('./dist/index.html')
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': resolve('./src')
        }
    }
})