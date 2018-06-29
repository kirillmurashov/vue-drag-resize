var path = require('path');
var envConfig = process.env.NODE_ENV === 'develop' ?
    require('./dev.conf') : process.env.NODE_ENV === 'testing' ?
        require('./test.conf') : require('./prod.conf');

var deepExtend = require('deep-extend');

module.exports = deepExtend({
    build: {
        distPath: path.resolve(__dirname, '../dist'),
        bundleAnalyzerReport: false
    },
    server: {
        assetsPath: path.resolve(__dirname, '../static'),
        port: 8081,
        host: '0.0.0.0',
        autoOpenBrowser: true,
    }
}, envConfig);