const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

// universal config
const config = {
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            {from: "*.html"}
        ])
    ],
    output: {
        publicPath: '/'
    },
    module:{
        rules: []
    },
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
    }
}

module.exports = (env, argv) => {
    const isProd = argv.mode == 'production' ? true : false;

    PostcssPlugins = [];

    if(isProd){
        // for production
        config.output = {
            path: __dirname + '/build'
        };
        PostcssPlugins = [
            require('cssnano'),
            require('autoprefixer')
        ];

    }else{
        // for development
        config.devServer = {
            contentBase: './dist',
            writeToDisk: true
        };
        PostcssPlugins = [
            require('autoprefixer')
        ];
    }

    config.module.rules.push({
        test: /\.(sc|sa|c)ss$/,
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
                    plugins: PostcssPlugins
                }
            },
            { loader: 'sass-loader' }
        ]
    });

    return config;
};