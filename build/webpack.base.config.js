const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    main: resolve('src/index.tsx')
  },
  output: {
    filename: 'app.[contenthash:8].js',
    path: resolve(process.cwd(), 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        }
      },
      {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader'
          ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                overrideBrowserslist: ['last 2 versions', '>1%']
              })
            ]
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:8].[ext]',
            outputPath: 'images/',
            limit: 10240,
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
