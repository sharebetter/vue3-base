const { defineConfig } = require('@vue/cli-service')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

//骨架屏渲染
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

//path引入
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  assetsDir: 'static',
  outputDir: process.env.outputDir || "dist", //生产环境构建文件的目录
  indexPath: "index.html",
  lintOnSave: process.env.NODE_ENV !== "production",
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !isProduction, // 生产环境的 source map
  parallel: false, //要设置为false，否则vant按需引入打包生产后样式会失效
  pwa: {},
  chainWebpack: config => {
      /* 设置别名 */
      config.resolve.alias
        .set("@", resolve("src"))
        .set('@api', resolve('src/api'))
        .set('@pic', resolve('src/assets/img'))
        .set("@assets", resolve("src/assets"))
        .set("@components", resolve("src/components"))
        .set("@plugins", resolve("src/plugins"))
        .set("@views", resolve("src/views"))
        .set("@router", resolve("src/router"))
        .set("@store", resolve("src/store"))
        .set("@utils", resolve("src/utils"))
      // ============压缩图片 start============
      config.module
          .rule('images')
          .use('image-webpack-loader')
          .loader('image-webpack-loader')
          .options({ bypassOnDebug: true })
          .end()
      // ============压缩图片 end============
  },
  configureWebpack: config => {

      // 生产环境相关配置
      if (isProduction) {
          //gzip压缩
          const productionGzipExtensions = ['html', 'js', 'css']
          config.plugins.push(
              new CompressionWebpackPlugin({
                  filename: '[path][base].gz',
                  algorithm: 'gzip',
                  test: new RegExp(
                      '\\.(' + productionGzipExtensions.join('|') + ')$'
                  ),
                  threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                  minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                  deleteOriginalAssets: false // 删除原文件
              })
          )

          // 代码压缩
          config.plugins.push(
              new UglifyJsPlugin({
                  uglifyOptions: {
                      //生产环境自动删除console
                      compress: {
                          drop_debugger: true,
                          drop_console: true,
                          pure_funcs: ['console.log']
                      }
                  },
                  sourceMap:  !isProduction,
                  parallel: true
              })
          )
      }

      // 骨架屏渲染
      // config.plugins.push(
      //     new SkeletonWebpackPlugin({
      //         webpackConfig: {
      //             entry: {
      //                 app: path.join(__dirname,'./src/components/Skeleton/index.js')
      //             }
      //         }
      //     })
      // )

      // 公共代码抽离
      config.optimization = {
          splitChunks: {
              cacheGroups: {
                  vendor: {
                      chunks: 'all',
                      test: /node_modules/,
                      name: 'vendor',
                      minChunks: 1,
                      maxInitialRequests: 5,
                      minSize: 0,
                      priority: 100
                  },
                  common: {
                      chunks: 'all',
                      test: /[\\/]src[\\/]js[\\/]/,
                      name: 'common',
                      minChunks: 2,
                      maxInitialRequests: 5,
                      minSize: 0,
                      priority: 60
                  },
                  styles: {
                      name: 'styles',
                      test: /\.(sa|sc|c)ss$/,
                      chunks: 'all',
                      enforce: true
                  },
                  runtimeChunk: {
                      name: 'manifest'
                  }
              }
          }
      }
  },
  css: {
    extract: isProduction,
    sourceMap: !isProduction,
    loaderOptions: {
      less: {
        globalVars: {},
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  pluginOptions: {
    /** 全局加载less 的 webpack 插件  */
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/common.scss")]
    }
  },
  /**
   * 配置proxy代理解决跨域问题
   */
  devServer: {
    open: false,
    hot: true, // 热更新
    compress: true, //是否启用gzip压缩
    port: 8080,
    proxy: {
      // '/proxy': { // 通用代理
      //   // target: 'https://healthapi.aiyidong.cn/', // 测试环境
      //   target: 'https://nhapi.xmzjsg.com /', // 正式环境
      //   ws: true,
      //   changOrigin: true,
      //   pathRewrite: {
      //     '^/proxy': '/'
      //   }
      // }
    }
  }
})