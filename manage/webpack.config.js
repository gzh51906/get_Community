const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//配置文件
module.exports = {
    //入口文件
    entry: "./src/index.js",

    //测试服务器
    devServer: {
        //服务器根目录
        contentBase: "./src",
        open: false,
        port:1904
    },
    // 目录别名
    // resolve: {
    //     // 设置目录别名
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //         '@@': path.resolve(__dirname, './src/components'),
    //         '~': path.resolve(__dirname, './src/pages')
    //     },
    //     extensions: ['.js', '.jsx']//扩展名
    // },

    //加载器
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: path.resolve(__dirname, './src'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css" // `style: true` 会加载 less 文件
                        }],
                        // ['@babel/plugin-proposal-decorators', {
                        //     legacy: true
                        // }],
                        // '@babel/plugin-proposal-class-properties',
                    ]
                }
            },
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },{
            test:/\.scss$/,
            use:["sass-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 指定模板文件
            template: './src/index.html',
            // filename:'main.html'
        })
    ]
}