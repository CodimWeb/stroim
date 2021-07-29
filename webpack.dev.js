const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    target: 'web',
    mode: 'development',
    devtool: 'source-map', //eval-sourcemap, inline-source-map, eval, eval-cheap-source-map, source-map, inline-cheap-source-map
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
        hot: false,
        port: 3000,
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
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
            filename: 'ui.html',
            template: './src/ui.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {from: './src/img', to: './img'},
                    // {from: './src/fonts', to: './dist/fonts'}
                ]
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
}