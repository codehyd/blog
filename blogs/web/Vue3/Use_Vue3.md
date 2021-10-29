---
title: Vue3的使用
date: 2021-10-29
tags:
 - Vue3
categories: 
 - Vue
---

## 怎么安装Vue有以下4种方法

1. 方法一 在页面中通过CDN的方式引入

2. 方法二 下载Vue的JS文件手动引入

3. 方法三 通过npm包管理工具安装

4. 方法四 通过Vue Cli 创建项目

***

[Vue3官网](https://v3.vuejs.org/)

```js
<script src="https://unpkg.com/vue@next"></script>
```

## 使用CDN引入Vue3

```html
<body>
  <!-- 3 添加 #app 元素 -->
  <div id="app"></div>

  <!-- 1. cdn 引入 vue3 -->
  <script src="https://unpkg.com/vue@next"></script>

  <script>
    // 2. 创建 Vue 实例 并且挂载到 #app里
    Vue.createApp({
      // 通过 template 模板属性 设置展示模板
      template: `<h2>hello word</h2>`
    }).mount('#app')

  </script>
</body>
```

## 使用本地引入Vue3

```html
<body>
  <!-- 3 添加 #app 元素 -->
  <div id="app"></div>

  <!-- 1. 本地引入 vue3 -->
  <script src="./js/vue.js"></script>

  <script>
    // 2. 创建 Vue 实例 并且挂载到 #app里
    Vue.createApp({
      // 通过 template 模板属性 设置展示模板
      template: `<h2>hello word</h2>`
    }).mount('#app')

  </script>
</body>

```