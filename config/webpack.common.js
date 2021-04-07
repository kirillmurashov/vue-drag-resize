const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],

    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'] },
            { test: /\.vue$/, use: ['vue-loader'] },

            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
            { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
        ],
    },
};
