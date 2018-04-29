module.exports = {
    entry: {
        "app": './src/app.js'
    },
    build: {
        env: '"testing"',
        sourceMap: true,
        uglify: true,
        cssSourceMap: false,
        gzip: false
    }
};