const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  // 入口
  entry: './src/js/index.js',
  // 出口
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: './js/build.js',
    publicPath: '/',
  },
  //打包环境
  mode: 'production',
  // loader加载器配置
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
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
              name: 'imgs/[hash:10].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        //排除node_modules不处理
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        //去除空格
        collapseWhitespace: true,
        //去除注释
        removeComments: true,
        //移除默认属性
        removeRedundantAttributes: true,
        //移除script的type属性
        removeScriptTypeAttributes: true,
        //移除link的type属性
        removeStyleLinkTypeAttributes: true,
        //使用doctype
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
