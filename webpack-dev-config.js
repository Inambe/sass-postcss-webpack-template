const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    'mode': 'development',
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            {from: "*.html"}
        ])
    ],
    devServer: {
        contentBase: './dist',
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|c|sc)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    }
}
