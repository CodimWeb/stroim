const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app-[hash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  { loader: MiniCssExtractPlugin.loader },
                  {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: false
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: false
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: false
                    }
                  }
                ]
              }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
          }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'home.html',
          template: './src/home.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'ceni-postavshikov.html',
          template: './src/ceni-postavshikov.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'ceni-postavshikov-horizontal.html',
          template: './src/ceni-postavshikov-horizontal.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'ceni-postavshikov-filter.html',
          template: './src/ceni-postavshikov-filter.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'tender-list.html',
          template: './src/tender-list.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'customers-requests.html',
          template: './src/customers-requests.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'advertisement.html',
          template: './src/advertisement.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'register.html',
          template: './src/register.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'password-recovery-1.html',
          template: './src/password-recovery-1.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'password-recovery-2.html',
          template: './src/password-recovery-2.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'password-recovery-3.html',
          template: './src/password-recovery-3.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'blacklist.html',
            template: './src/blacklist.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'blacklist-company.html',
            template: './src/blacklist-company.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'add-to-blacklist.html',
            template: './src/add-to-blacklist.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'services.html',
            template: './src/services.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/about.html'
        }),
        new HtmlWebpackPlugin({
          filename: 'ui.html',
          template: './src/ui.html'
        }),
        new MiniCssExtractPlugin({
            // filename: "[name].[hash].css"
            filename: "css/style.[hash].css"
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    { from: './src/img', to: './img' },
                    // { from: './src/fonts', to: './dist/fonts' }
                ]
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
}
