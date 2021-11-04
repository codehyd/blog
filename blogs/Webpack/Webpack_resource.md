---
title: webpack插件
date: 2021-11-04
tags:
 - Webpack
categories: 
 - Webpack
---

## 认识Plugin
> loader 与 plugin的区别
- Loader 是用于特定模块类型的转换加载
- Plugin 可以用于执行更广泛的任务 比如打包优化 资源管理 环境变量注入等

## CleanWebpackPlugin

> 在webpack使用过程中 如需要重新打包都需要手动删除打包为文件 则可以借助与 CleanWebpackPlugin 插件来帮助我们完成自动删除旧的包

1. 安装
```
npm install clean-webpack-plugin -D
```

2. 使用
```js
// 1. 导入 因为 clean-webpack-plugin 需要解构
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 2. 使用
module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

## HtmlWebpackPlugin

> 在webpack打包后在部署文件并没有 index.html 很不友好

1. 安装
```
npm install html-webpack-plugin -D
```

2. 使用
```js
// 1. 导入 html-webpack-plugin 不需要解构
const  HtmlWebpackPlugin  = require("html-webpack-plugin")
// 2. 使用
module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

> HtmlWebpackPlugin 指定模板

```js
new HtmlWebpackPlugin({
  template = '' // 对应地址
})
```