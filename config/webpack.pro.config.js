const path  = require('path')
const resolve = (p) => path.resolve(__dirname, '../example', p)
const { merge } = require('webpack-merge')

const devConfig = require('./webpack.dev.config')

module.exports =  merge(devConfig, {
    mode: 'production',
    output: {
        filename: 'js/[name]-[hash].js',
        path: resolve('./dist')
    },
    module: {
        rules: []
    },
    optimization:  {
        runtimeChunk: {
            name: 'runtime'
        },
        moduleIds:'hashed',
        minimizer: [
            // new CssMinimizerPlugin(),
            // new TerserPlugin()
        ]
    }
})