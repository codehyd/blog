---
title: webpack的配置
date: 2021-11-03
tags:
 - Webpack
categories: 
 - Webpack
---

## webpack的配置信息

> 需要在文件根目录下新建webpack.config.js的配置文件

```js
const path = require('path') // node 模块下的 path 模块

module.exports = {
  // 打包文件入口
  entry: "./src/index.js", 
  // 打包后的出口文件
  output:{
    path:  path.resolve(__dirname,"./build"), // (绝对路径) 打包文件在绝对路径的 build 目录文件里面
    filename: "bundle.js", // 打包后的文件 默认为main.js 可别名 比如 bundle.js
  }
}
```

> 如果根目录下 webpack.config.js 需要起别名的话 需要在package.json修改配置
```json
"build": "webpack --config 别名"
```