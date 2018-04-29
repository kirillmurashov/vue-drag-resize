module.exports = {
    entry: {
        "index": './src'
    },
    build: {
        env: '"production"',
        sourceMap: false,
        uglify: true,
        cssSourceMap: false,
        gzip: false
    }
};