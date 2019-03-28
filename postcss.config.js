const isProd = process.env.NODE_ENV === 'production' ? true : false;
var uniConfig = {
    plugins: [
        require('autoprefixer')
    ]
};
module.exports = () => {
    if(isProd){
        uniConfig.plugins.push(
            require('cssnano')
        );
    }
    return uniConfig;
}