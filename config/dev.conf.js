module.exports = {
    entry: {
        "app": './src/app.js'
    },
    build: {
        env: '"development"',
        sourceMap: true,
        uglify: false,
        cssSourceMap: false,
        gzip: false
    }
};