const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 入口
  entry: './src/js/index.js',
  // 出口
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/build.js',
  },
  //打包环境
  mode: 'development',
  // loader加载器配置
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|git)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: './imgs/[hash:10].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    port: 8080,
    host: '127.0.0.1',
    open: true, //自动打开浏览器
    quiet: true, //静默模式
    compress: true, //使用gzip压缩
  },
};
