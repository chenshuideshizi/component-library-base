const path  = require('path')
const resolve = (p) => path.resolve(__dirname, '../example', p)

module.exports =  merge(common, {
    mode: 'production',
    entry: {
        app: 'example/src/main.js'
    },
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
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
})