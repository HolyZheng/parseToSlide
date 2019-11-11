const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/js/parseToSlider.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                    use: [
                    'file-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                    mangle: true
                }
            })
        ]
    },
    plugins: [ 
        new CleanWebpackPlugin()
    ],
    externals: [nodeExternals()]
}