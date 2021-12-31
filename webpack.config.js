 const path = require('path');
 const htmlWebpackPlugin = require('html-webpack-plugin');
 const miniCssExtractPlugin = require("mini-css-extract-plugin");
 const cssMinimizer = require('css-minimizer-webpack-plugin');
 const terserPlugin = require('terser-webpack-plugin');
 const {cleanWebpackPlugin} = require('clean-webpack-plugin');
const { optimize } = require('webpack');

 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname,'dist'),
         filename: 'bundle.js',
         publicPath: '/'
     },
     resolve: {
         extensions: [
             ".js",
             ".jsx"
         ],
         alias:{
             '@components': path.resolve(__dirname,'src/compoments/'),
             '@styles': path.resolve(__dirname,'src/styles/')
         }
     },
     module: {
         rules: [
             {
                 test: /\.(js|jsx)$/,
                 exclude : /node_modules/,
                 use: {
                     loader: "babel-loader"
                 }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
         ]
     },
     plugins: [
         new htmlWebpackPlugin({
             template: "./public/index.html",
             filename: "./index.html"
         }),
         new miniCssExtractPlugin({
             filename: "[name ].css"
         }),
         new cleanWebpackPlugin()
     ],
     optimization: {
         minimize: true,
         minimizer: [
             new cssMinimizer(),
             new terserPlugin()
         ]
     },
     mode: 'production'
 }