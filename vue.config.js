module.exports = {
    css: {
        extract: false
    },
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals', {
                vue: 'Vue',
                axios: 'axios',
                lodash: '_',
                nprogress: 'NProgress',
                'vue-router': 'VueRouter',
                'vue-lazyoad': 'VueLazyload'
            })
            // 使用插件，给args添加参数isProd属性并赋值true
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
            // 使用插件，给args添加参数isProd属性并赋值true
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
        config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('image-webpack-loader').loader('image-webpack-loader')

    }
}
