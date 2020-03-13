const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .end()
        config.module
            .rule('raw-loader')
            .test(/.(bpmn|xml)$/)
            .use('raw-loader')
            .loader('raw-loader')
            // .options({
            //     esModule: true
            // })
            .end()
    }
}