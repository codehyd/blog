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

> 在默认情况下只能打包js文件 不会识别比如css文件等

## 如果需要引入对应的样式 则需要安装对应的 loader (css-loader | style-loader)

> 若值安装css-loader 则不会生效 需要引入style-loader
-  因为css-loader 只负责加载css文件  不会吧css代码加载到html内

1. 需要安装对应的loader
```
npm install css-loader -D
npm install style-loader -D
```

2. loader需要配置对应的规则
  - 内联方式 
```js
import "css-loader! ../style.css" // 不推荐
```
  - 配置方式
```js
module.exports = {
  module:{
    // 配置规则
    rules:[
      // css
      {
        test: /\.css$/,  // 正则表达式
        // 1. loader的写法(语法糖)
        // loader: "css-loader"

        // 2. 完整写法  
        // 注意: use写法加载的loader的顺序是从后往前执行的 加载css样式是需要先加载css-loader 在加载style-loader
        use:[
          // {loader : "css-loader"}
          "style-loader",
          "css-loader"
        ]
      },
      // less (需要先将less 文件转换为css文件 所以 less-loader 必须放在最后)
      {
        test: /\.less$/,  
        use:[
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
    ]
  }
}
```