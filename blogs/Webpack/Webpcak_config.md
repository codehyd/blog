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
## 加载图片资源

> 如果需要将图片资源引入到项目中的话 我们需要加载对应的资源

1. 需要下载对应的loader资源加载 (file-loader)
```
npm install file-loader -D
```

2. 在 webpack.config.js 配置
```js
const path = require('path') // node 模块下的 path 模块

module.exports = {
  // 打包文件入口
  entry: "./src/index.js",
  // 打包后的出口文件
  output: {
    path: path.resolve(__dirname, "./build"), // (绝对路径) 打包文件在绝对路径的 build 目录文件里面
    filename: "bundle.js", // 打包后的文件 默认为main.js 可别名 比如 bundle.js,
    publicPath: "./build/" // 设置资源的公共地址
  },
  module: {
    rules: [
    // 图片资源
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          "file-loader",
        ]
      },
    ]
  }
}
```

3. 在页面中使用引入图片
```js
// 一 先引入图片资源
import image from 'image'
// 二 创建图片节点  并挂载到页面
const imgEl = document.createElement('img')
imgEl.src = image
document.body.appendChild(imgEl)
```

## 资源文件的命名规则

> 有时候我们处理后的额文件名称按照一定的规则进行显示

1. 比如保留原来的文件名 扩展名 同时为了防止重复包含了一个hash值等
2. 这个时候我们可以使用 PlaceHolders 来完成
  - \[ext\] : 处理文件的扩展名 
  - \[name\] : 处理文件的名称
  - \[hash\] : 文件的内容, 使用MD4的散列函数处理生成的一个 128 位的hash值 (32个十六进制)
  - \[contentHash\] : 在file-loader中和\[hash\]结果是一致的
  - \[hash:\<length\>\] : 截取hash的长度 默认32个字符
  - \[path\] : 文件相对于webpack配置文件的路径

```js
// 关于图片资源的命名配置
module: {
  rules: [
    // 图片资源规则
    {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: {
        loader: "file-loader", // 使用file-loader
        // 关于file-loader的相关配置
        options: {
          outputPath:"img", // 输出路径
          name:"[name]_[hash:6].[ext]", // 设置图片的命名规则
        }
      }
    },
  ]
}
```

> 如果需要将图片base64编码

1. 需要下载对应的loader (url-loader)

```
npm install url-loader -D
```
2. 配置 webpack.config.js
```js
// 关于图片资源的命名配置
module: {
  rules: [
    // 图片资源规则
    {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: {
        loader: "url-loader", // 使用url-loader
        // 关于url-loader的相关配置
        options: {
          name:"[name]_[hash:6].[ext]", // 设置图片的命名规则
          limit: 100 * 1024, // 如果小于 100kb 才需要做 base64 编码
        }
      }
    },
  ]
}
```


## 认识 asset module type (资源模块类型)

> 在webpack5开始后 可以直接使用 asset module type (资源模块类型) 来代替上面的资源加载loader

1. 资源模块类型 (asset module type) 通过添加4种 新的模块类型 可以代替以下 loader
  - asset/resource 发送一个单独的文件并导出URL 类似于file-loader
  - asset/inline 导出一个资源的 data URI 类似于 url-loader
  - asset/source 导出资源的源代码 类似于 raw-loader
  - asset 在导出一个 data URI 和发送一个单独的文件之间自动选择 类似于url-loader 并且配置资源体质限制

```js
// 关于资源模块类型的配置
module: {
  rules: [
    // 图片资源资源规则
    {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      type: "asset",
      // 文件限制
      parser: {
        dataUrlCondition:{
          maxSize: 100 * 1024 // 超过100kb 则转化为 base64
        },
      },
      // 生成文件名称规则
      generator: {
        filename: "img/[name]_[hash:6][ext]"
      }
    },
  ]
}
```

## 字体图标的加载

1. 引入字体图标

```js
import '../font/iconfont.css'
```
2. 创建字体图标元素
```js

const iEl = document.createElement('i')
iEl.className = 'iconfont icon-ashbin'
document.body.appendChild(iEl)
```
3. 配置 webpack.config.js
```js
module: {
  rules: [
    // 字体图标规则
    {
      test: /\.(eot|ttf|woff2?)$/,
      type: "asset/resource",
      // 生成文件名称规则
      generator: {
        filename: "img/[name]_[hash:6][ext]"
      }
    },
  ]
}
```


## 设置模式
```js
module.exports = {
  mode: "development",  //  开发阶段模式
  mode: "production",  //  准备打包上线时

  devtool: "source-map" // 设置source-map 建立js映射文件 方便调试代码的错误
}
```