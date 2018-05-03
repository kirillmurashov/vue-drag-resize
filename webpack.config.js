const webpack = require('webpack');
const config = require('./config');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { VueLoaderPlugin } = require('vue-loader');

let plugins = [];

plugins.push(new VueLoaderPlugin());

if(config.build.sourceMap){
    plugins.push(new webpack.SourceMapDevToolPlugin({
        filename: '[name].map'
    }))
}

plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: config.build.env
    }
}));


if(config.build.gzip){
    plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js)$/,
        threshold: 10240,
        minRatio: 0.8
    }));
}

if(config.build.bundleAnalyzerReport){
    plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    }))
}

module.exports = {
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
            }
        ]
    },

    devServer: {
        contentBase: [config.build.distPath, config.server.assetsPath],
        historyApiFallback: true,
        noInfo: true,
        open: config.server.autoOpenBrowser,
        port: config.server.port
    },

    entry: config.entry,

    output: {
        path: config.build.distPath,
        library: 'VueDragResize',
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false
            })
        ]
    },

    plugins: plugins

};