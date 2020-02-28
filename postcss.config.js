module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                // return file.indexOf('vant') !== -1 ? 37.5 : 75;
                return 37.5 // 上面的打包后样式的rem值为生产环境下的一半
            },
            propList: ['*'], // propList: ['height'] 只对css height属性进行px->rem的转换；内联样式不会转换
        },
    },
};