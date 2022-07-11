const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    port: 9090,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_CROSS_ORIGIN,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: '@import "@/styles/common.scss";'
  //     }
  //   }
  // }
})
