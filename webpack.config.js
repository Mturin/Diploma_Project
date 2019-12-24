const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: { 
        index: './script/index.js',
        about: './script/about.js',
        analytics: './script/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './script/[name].[chunkhash].js'
    },
    module: {
        rules: [{ 
            test: /\.js$/,
            use: { loader: "babel-loader" },
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),'css-loader', 'postcss-loader']
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
        },
        {
            test: /\.(ttf|eot|svg|png|jpg|gif|ico|cur)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
                'file-loader?name=./images/[name].[ext]',
                {
                    loader: 'image-webpack-loader'
                },
                ]
        }]
        
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: './style/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            template: './pages/index.html',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            template: './pages/about.html',
            filename: 'about.html'
          }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            template: './pages/analytics.html',
            filename: 'analytics.html'
          }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV) 
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }) 
        ]
    };
      