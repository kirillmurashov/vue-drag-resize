const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,

    entry: [paths.src + '/index.js'],

    output: {
        path: paths.build,
        filename: 'index.js',
        publicPath: '/',
        library: {
            name: 'VueDragResize',
            type: 'umd'
        }
    },

    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            root: 'Vue'
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: false,
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...'],
        // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
        // instead of having their own. This also helps with long-term caching, since the chunks will only
        // change when actual code changes, not the webpack runtime.
        // runtimeChunk: {
        //     name: 'runtime',
        // },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
