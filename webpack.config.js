const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

module.exports = {
    plugins: [new MiniCssExtractPlugin({
      filename: 'css/style.css'
    })],
    entry: './src/client/js/main.js',
    mode: 'development',
    watch: true, // 자동으로 실행 하기 위한 옵션
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'assets'),
        clean: true
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              },
            },
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          }
        ]
      }
}

