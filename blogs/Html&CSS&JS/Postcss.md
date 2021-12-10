---
title: 认识Postcss工具
date: 2021-12-03
tags:
 - CSS
categories: 
 - CSS
---

## 认识PostCSS
- PostCSS是一个通过JavaScript来转换样式的工具
- 这个工具可以帮助我们进行一些CSS的转换和适配, 比如自动添加浏览器前缀 css样式的重置
- 如果需要使用实现这些功能则需要借助于PostCSS对应的插件

> 安装PostCSS
```
npm install postcss postcss-cli postcss-loader -D
```

> 只安装PostCSS是不能生效的 因为PostCSS只是一个工具 我们还需要借助于其他插件
  -  (autoprefixer) 增加浏览器前缀插件

```
npm install autoprefixer -D
```
  - (postcss-preset-env) 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的CSS，并且会根据目标浏览器或者运行时环境添加所需的polyfill 并且包括会自动帮助我们添加autoprefixer（所以相当于已经内置了autoprefixer）
 
```
npm install postcss-preset-env -D
```

在根目录下创建 postcss.config.js 文件
```js
module.exports = {
  plugins:[
    require("autoprefixer") // 插件名称
  ]
}
```
在 webpack.config.js 文件配置 loader规则
```js
module.exports = {
  module:{
    // 配置规则
    rules:[
      {
        test: /\.css$/,  
        use:[
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
    ]
  }
}
```