module.exports = {

    plugins: {
        'postcss-preset-env': {
            preserve: false,
            importFrom: './src/demo/styles/00vars.css',
            browsers: 'last 5 versions',
        },
    },
};
