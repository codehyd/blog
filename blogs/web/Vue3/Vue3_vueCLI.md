---
title: Vue CLI 与 Vite
date: 2021-11-06
tags:
 - Vue3
categories: 
 - Vue
---

# Vue CLI 安装和使用

> 全局安装Vue CLI

```
# 安装 Vue CLI
npm install @vue/cli -g

# 升级 Vue CLI
npm update @vue/cli -g 

# 创建 Vue3 项目
vue create 项目名称
```


# 认识Vite

> Vite 是一种新型前端构建工具 能够显著提升前端开发体验 它有以下两部分组成

- 一个开发服务器基于原生ES模块提供了丰富的内建功能 HMR的速度非常快速
- 一套构建指令 使用rollup打开我们的代码 并且他是预配置的 可以输出生成环境的优化过的静态资源

## 安装Vite

```
安装 vite 全局
npm install vite -g

安装 vite 局部
npm install vite -D
```


### Vite 对 css 的支持
> vite 可以直接支持css的处理
 - 直接导入css文件即可

### Vite 对 less 的支持
> vite 可以直接支持less预处理器 不过需要安装less编译器 不用安装less-loader
 - 需要安装less编译器
```
npm install less -D
```

### Vite 对 postcss 的支持
> vite 可以支持postcss 不过需要安装postcss以及postcss对应的插件 并且需要新建并且配置postcss.config.js配置文件

- 以 postcss 工具的 postcss-preset-env 为例
```
# 安装 
npm install postcss postcss-preset-env -D

# 配置 在postcss.config.js
module.exports = {
  plugins:[
    require('postcss-preset-env')
  ]
}
```

### Vite 对 TypeScript 的支持
> vite 对TypeScript是支持的 她会使用ESBuild来编译 我们需要导入即可

### Vite 对 vue 文件的支持
> vite 对 vue 提供第一优先支持 不过需要安装对应的插件

1. Vue3 单文件支持 @vitejs/plugin-vue
1. Vue3 JSX 支持：@vitejs/plugin-vue-jsx
1. Vue2 支持：underfin/vite-plugin-vue2

- 假设需要使用Vue3

```
# 安装
npm install @vitejs/plugin-vue -D

配置 新建 vite.config.js
import vue from '@vitejs/plugin-vue'

module.exports = {
  plugins:[
    vue()
  ]
}
```

### Vite 打包
```
npx vite build 
```

### Vite 打包后预览
```
npx vite preview 
```