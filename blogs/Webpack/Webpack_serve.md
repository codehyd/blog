---
title: webpack本地服务
date: 2021-11-05
tags:
 - Webpack
categories: 
 - Webpack
---


# 为什么需要搭建本地服务器呢?

- 目前我们开发代码需要重新运行 npm run build 对源代码进行打包
- 并且通过VsCode工具的live server插件通过浏览器的方式查看源代码

> 这种模式非常影响我们开发效率 我们希望可以做到文件发生变化时可以自动完成编译和展示

1. 为了完成自动编译 webpack 提供了集中可选方式
- webpack watch mode
- webpack-dev-server(常用)
- webpack-dev-middleware

> webpack watch mode

- 方法比较简单 只需要在package.json配置

```json
"build": "webpack --watch"
```

- webpack watch mode 比较简单 它会侦听文件的变化并且通过 live server 插件 可以重新做一个刷新 更改源代码后会自动编译
- 如果不跟 --watch 也是可以的
- 只需要在 webpack.config.js 配置文件下添加 watch: true 即可


> webpack-dev-server

1. webpack watch mode 的方法可以监听到文件的变化 但事实上她本身是没有自动刷新浏览器的功能的
  - 目前我们可以在vscode中使用 live-server 插件来完成这样的功能
  - 但是我们希望不使用 live-server 的情况下具备 live raloading (实时重新加载) 的功能
  - 需要安装 webpack-dev-server

```
npm install webpack-dev-server -D
```
- 修改 package.json 配置文件 (添加)

```json
// 配置
"serve": "webpack serve"

// 使用
npm run serve
```

2. serve 与 build 的区别
  - serve 会将资源打包 但是不会写入到任何输出文件 而是将打包后的文件保留到内存中 它会在本地开启一个本地服务
  - build 会将资源打包到配置的输出文件里

3. 关于 webpack-dev-serve 配置

```js
module.exports = {
  // 如果设置了 devServer 的 hot 最好添加上 target 配置项
  target: "web",
  // 配置 webpack-dev-serve
  devServer:{
    // 如果在 webpack 没有加载的服务 可以配置 contentBase 这里加载服务
    contentBase: "",
    // 模块热替换 hot 模块热替换表示在程序运行过程中 (替换, 添加, 删除) 模块 而无需重新刷新整个页面
    // 它智慧更新需要变化的内容 不重新加载整个页面可以保留某些应用程序状态不丢失
    hot:true,
    // 配置主机地址 host
    host: '',
    // 修改端口号
    port:'',
    // 是否打开浏览器
    open: true,
    // 是否为静态资源开启gzip(压缩) compress
    compress: true,
    // 配置跨域
    proxy:{
      "/api":{
        target:"", // 请求目标路径
        // 重写地址 相当于正则替换
        pathRewrite:{ 
          "^/api":""
        },
        secure: false, // 不接受转发到https的请求 如果希望接收需要改为false
        changeOrigin: true, // 表示是否更新代理后请求的请求头地址
      }
    }
  }
}
```

