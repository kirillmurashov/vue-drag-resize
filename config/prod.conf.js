module.exports = {
    entry: {
        "index": './src',
        "demo": './src/demo/app'
    },
    build: {
        env: '"production"',
        sourceMap: false,
        uglify: true,
        cssSourceMap: false,
        gzip: false
    }
};