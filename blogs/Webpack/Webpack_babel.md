---
title: webpack之babel
date: 2021-11-04
tags:
 - Webpack
categories: 
 - Webpack
---

## 认识Babel

- Babel对于前端来说是不可缺少的一部分
- 如果我们想要使用ES6+语法 TypeScript React项目 都离不开Babel
- Babel是工具链 主要与将ECMAScript 2015+ (ES6+)  代码转换为向后兼容的JavaScript
- 包括语法转换源代码转换等

## Babel的使用

> Babel作为独立的工具 不用和webpack等构建工具配置来单独使用

1. 需要安装两个库 @babel/core @babel/cli

```
npm install @babel/core @babel/cli -D
```

2. 使用 Babel 来处理我们的源代码
```
# src：是源文件的目录
# --out-dir：指定要输出的文件夹 dist
npx babel 'src' --out-dir dist
```

> 如果需要 babel转换 一定的代码时 需要使用babel相关的插件

1. 比如我们需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件 (@babel/plugin-transform-arrow-functions)

```
# 安装 @babel/plugin-transform-arrow-functions
npm install @babel/plugin-transform-arrow-functions -D

# 使用
npx babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions

```

2. 如果需要将 ES6 语法的 const 转化为 var 则需要使用 (@babel/plugin-transform-block-scoping)

```
# 安装 @babel/plugin-transform-block-scopin
npm install @babel/plugin-transform-block-scoping -D 

# 使用
npx babel src --out-dir dist --plugins=@babel/plugin-transform-block-scoping,@babel/plugin-transform-arrow-functions
```

3. Babel的预设preset

   - 如果源代码需要转换的内容过多 一个个设置是比较麻烦的 我们可以使用预设（preset）

```
# 安装 @babel/preset-env
npm install @babel/preset-env -D

# 使用
npx babel src --out-dir dist --presets=@babel/preset-env
```

4. Babel的底层原理

> Babel是如何做到将我们的一段代码（ES6、TypeScript、React）转成另外一段代码（ES5）的呢？

- 从一种源代码(原生语言) 转化成另一种源代码(目标语言)
- Babel 可以看成编译器 他将我们的源代码转化成浏览器能识别的另外一段源代码

> Babel 也拥有编译器的工作流程
  1. 解析阶段
  2. 转换阶段
  3. 生成阶段
  - 原生源代码 -> 解析 -> 转换 -> 代码生成 -> 目标源代码


## webpack ES6  转换为 ES5 代码

> 需要安装Babel-loader

```
npm install babel-loader -D
```

- 配置webpack
```js
{
  test: /\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      // 两种写法 一 配置 babel 插件
      plugins: [
        "@babel/plugin-transform-block-scoping",
        "@babel/plugin-transform-arrow-functions"
      ]
      // 二 使用presets预设
      presets: [
        "@babel/preset-env"
      ]
    },
  },
}
```

> 当然可以将babel配置文件抽离出去

1. babel给我们提供了两种配置文件的编写
 - babel.config.json（或者.js，.cjs，.mjs）文件
 - .babelrc.json（或者.babelrc，.js，.cjs，.mjs）文件

2. 它们两个有什么区别呢？目前很多的项目都采用了多包管理的方式（babel本身、element-plus、umi等）
 - .babelrc.json：早期使用较多的配置方式，但是对于配置Monorepos项目是比较麻烦的
 - babel.config.json（babel7）：可以直接作用于Monorepos项目的子包，更加推荐；

> 根目录下创建 babel.config.js 文件
```js
module.exports = {
  presets: [
    "@babel/preset-env"
  ]
}
```

```js
{
  test: /\.js$/,
  loader: "babel-loader"
}
```
