// js模块将es6转成es5
// 将css文件和js文件分离打包
// css的转换
// 配置别名
// 图片处理之类

module.exports = {
    entry: {
        app: 'example/src/main.js'
    },
    output: {
        filename: '',
        outpath: ''
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: ['vue-loader']
            },
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.s(c|a)ss$/,
                use: 'style-loader!css-loader!scss-loader'
            },
            {
                test: /.css$/,
                use: 'mini-css-extract-loader!scss-loader'
            }
        ]
    },
    plugins: [

    ]
}