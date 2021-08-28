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
        rules: [{
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
                use: [{
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
            filename: 'ceni-postavshikov-card.html',
            template: './src/ceni-postavshikov-card.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'advertisement-card.html',
            template: './src/advertisement-card.html'
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
            filename: 'advertisement.html',
            template: './src/advertisement.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'banner-grid.html',
            template: './src/banner-grid.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'price-list.html',
            template: './src/price-list.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'contacts.html',
            template: './src/contacts.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'dictionary.html',
            template: './src/dictionary.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'dictionary-pipes.html',
            template: './src/dictionary-pipes.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'dictionary-brackets.html',
            template: './src/dictionary-brackets.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'dictionary-shutter.html',
            template: './src/dictionary-shutter.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'dictionary-coupling.html',
            template: './src/dictionary-coupling.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'tender-bidding-1.html',
            template: './src/tender-bidding-1.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'tender-bidding-2.html',
            template: './src/tender-bidding-2.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'tender-bidding-3.html',
            template: './src/tender-bidding-3.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'statement-unauth.html',
            template: './src/statement-unauth.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'statement-isauth.html',
            template: './src/statement-isauth.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'add-price-list.html',
            template: './src/add-price-list.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'add-tender.html',
            template: './src/add-tender.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'basket.html',
            template: './src/basket.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'basket-success.html',
            template: './src/basket-success.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'basket-empty.html',
            template: './src/basket-empty.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_price.html',
            template: './src/personal-account_price.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-office.html',
            template: './src/personal-account_my-office.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_personal-data.html',
            template: './src/personal-account_personal-data.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-company.html',
            template: './src/personal-account_my-company.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-tenders.html',
            template: './src/personal-account_my-tenders.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-offers.html',
            template: './src/personal-account_my-offers.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-applications.html',
            template: './src/personal-account_my-applications.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-application.html',
            template: './src/personal-account_my-application.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-app-response.html',
            template: './src/personal-account_my-app-response.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-ads.html',
            template: './src/personal-account_my-ads.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'personal-account_my-mailing.html',
            template: './src/personal-account_my-mailing.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'add-an-ad.html',
            template: './src/add-an-ad.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'create-tender.html',
            template: './src/create-tender.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'create-request.html',
            template: './src/create-request.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui.html',
            template: './src/ui.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/img', to: './img' },
                // {from: './src/fonts', to: './dist/fonts'}
            ]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
}
