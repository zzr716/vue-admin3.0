const path = require("path");
const { config } = require("process");
module.exports = {
  // 基本路径
  publicPath: process.env_NODE_ENV === "production" ? "" : "/",
  // 输出文件目录
  outputDir: process.env_NODE_ENV === "production" ? "dist" : "devdist",
  // eslint是否再保存的时候检查
  lintOnSave: true,
  chainWebpack: config => {},
  configureWebpack: config => {},
  productionSourceMap: false,
  css: {
    // extract: true,
    // sourceMap: false,
    // loaderOptions: {
    //     sass: {
    //         prependData: `@import "./src/styles/main.scss;`
    //     }
    // },
    // modules: false
  },
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hot: true,
    hotOnly: false,
    proxy: null,
    overlay: {
      warnings: true,
      errors: true
    },
    before: app => {}
  },
  pluginOptions: {}
};
