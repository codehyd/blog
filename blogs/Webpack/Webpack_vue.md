---
title: webpack打包Vue
date: 2021-11-05
tags:
 - Webpack
categories: 
 - Webpack
---

## 通过 webpack 打包 vue

> 如果需要通过 webpack 打包 vue 文件的话 则需要使用 npm 下载关于 vue 的包

```js
// 安装 vue 
npm install vue@next 

// 使用 引入vue
// import { createApp } from 'vue'
// 因为 vue 版本解析不同 在 webpack 中需要使用  'vue/dist/vue.esm-bundler'
import { createApp } from 'vue/dist/vue.esm-bundler'

//  创建 app
const appEl = document.createElement('div')
appEl.id = 'app'

const app = createApp({})
app.mount('#app')
```

