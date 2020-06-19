const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprfixer = require("autoprefixer");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');



module.exports = {
    entry: {index: "./src/index.js",
            reservation: "./src/reservation.js"},
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        port: 9000,
        // watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            favicon: './src/assets/img/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            filename: "reservation.html",
            template: "./src/reservation.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
        }),
        new BrowserSyncPlugin({
            host:'localhost',
            port: 9100,
            proxy: 'http://localhost:9000'
        },{
            reload: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprfixer()
                ]
            }
        }),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: './dest/assets'
        }]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new SvgStore({
            // svgo options
            svgoOptions: {
              plugins: [
                { removeTitle: true }
              ]
            },
            prefix: 'icon'
          })               
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js"
    },
    module: 
    {
        
        rules: [{
            test: /\.scss$/,
            use: [
                // {loader: "style-loader/url"},
                // {loader: "file-loader",
                // options: {name: "[name].[ext]"}},
                // "style-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                "postcss-loader"                
            ]
        },
    
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }, 
               
    {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: {
            loader: "file-loader",
            options: {
                name: "[name].[ext]"
            }
        }
    },
    {
        test: /\.(html)$/,
        use: ["html-loader"]
    },

    
]
}
}