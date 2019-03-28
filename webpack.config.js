const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// universal config
const config = {
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            {from: "*.html"}
        ])
    ],
    output: {
        path: path.join(__dirname, 'build')
    },
    module:{
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
    }
}

module.exports = (env, argv) => {
    const mode = argv.mode;
    process.env.NODE_ENV = mode;
    const isProd = mode === 'production' ? true : false;

    if(isProd){
        // config for production only
    }else{
        // config for development only
    }

    return config;
};