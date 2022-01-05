const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (p) => path.resolve(__dirname, '../example', p)

module.exports =  merge(common, {
    mode: 'development',
    entry: {
        app: 'example/src/main.js'
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
    ]
})