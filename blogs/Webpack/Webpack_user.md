---
title: webpack的基本使用
date: 2021-11-03
tags:
 - Webpack
categories: 
 - Webpack
---

## webpack的认识

> 目前前端的开发已经变得越来越复杂

1. 在开发的过程中我们血药通过模块化的方式来开发
2. 比如会使用一些高级的特新来加快我们开发效率或者安全性， 比如通过ES6+ TypeScript脚本逻辑 通过sass less等方式来编写css样式代码
3. 还希望实时监听文件的变化并且反应到浏览器上提高开发效率
4. 并且开发完后需要将代码进行压缩 合并等相关的优化

> webpack是静态的模块化打包工具， 为现代的JavaScript应用程序

>  Vue项目加载的文件有那些呢？
1. JavaScript的打包
  - 将ES6语法转换为ES5的语法
  - Typescript转换为JavaScript
2. Css的打包
  - css文件模块的加载 提取
  - less sass等预处理器的处理
3. 资源文件 img font的处理
  - 图片img文件的加载
  - 字体font文件的加载
4. Html资源的处理
  - 打包html资源文件
5. 处理vue项目的SFC文件 .vue文件

## webpack的使用前前提
1. [webpack的官方文档](https://webpack.js.org/)
2. Webpack的运行是依赖Node环境的，所以我们电脑上必须有Node环境
  - 所以我们需要先安装Node.js，并且同时会安装npm；
  - 我当前电脑上的node版本是v14.15.5，npm版本是6.14.11（你也可以使用nvm或者n来管理Node版本）
  - [Node官方网站](https://nodejs.org/)

## webpack的安装
- webpack安装目前分为两个 webpack webpack-cli
```cmd
# 全局安装 -g
npm install webpack webpack-cli -g

# 全局安装 -D 需要在项目根目录内创建package.json
npm init -y
npm install webpack webpack-cli -D
```

- 查看webpack版本
```cmd
webpack --version
```

```cmd
# 使用全局webpack
webpack

# 使用局部webpack 局部安装webpack webpack-cli
在 package.json -> scripts 内 新建 "build":"webpack"
npm run build (与package.json的key相同)
```

