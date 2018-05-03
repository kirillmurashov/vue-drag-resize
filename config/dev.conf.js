module.exports = {
    entry: {
        "app": './src/demo/app.js'
    },
    build: {
        env: '"development"',
        sourceMap: true,
        uglify: false,
        cssSourceMap: false,
        gzip: false
    }
};