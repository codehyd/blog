---
title: vue-router的使用
date: 2021-12-11
tags:
 - Vue3
categories: 
 - Vue
---

> Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌

## vue-router安装

```
npm install vue-router@4 
```

- @4表示当前最新版本

## vue-router配置

- 在根目录下新建router目录且新建index.js

- 假设现在已经创建了Home.vue组件

```js
// 1. 导入home.vue组件
import Home from './Home.vue'

// 2. 创建路由映射
const routes = [
  // 重定向配置 表示路由的默认路径
  {
    path:'/',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home, 
    component: () => import('./Home.vue'), //表示异步组件
    component: () => import(/* webpackChunkName: "home-chunk" */'./Home.vue') //表示异步组件且进行一个分包

    // 路由嵌套
    children:[
      {
        path:'...',
        component: '...'
      }
    ]
  },
  // NotFound路由 表示没有匹配到的路由
  {
    path:'/:pathMatch(.*)',
    component: () =>  import('./notFount.vue')
  }

]

// 3. 创建路由对象
// 需要在 vuerouter 中导入 createRouter 
// createRouter是一个函数 他需要传递一个对象
// 其中必须传递的参数为 routers: 路由映射 | history: 路由模式(hash | history)
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const router = createRouter({
  routes,
  // history: createWebHashHistory() hash模式
  history: createWebHistory() // history模式
})

// 4. 导出路由配置
exprot default router

// 5. 在vue入口注册路由
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
// 或
createApp(App).use(router).mount('#app')
```

## 在页面使用

- 在 vue-router 内部全局定义了一个路由组件 是用来显示路由组件 <router-view />
- 还有另外一个全局组件的作用是用来跳转至路由 <router-link /> 


```vue
<router-link to="/home">首页</router-link>
<router-view />
```

## router-link
- router-link 组件中有很多props可以配置
1. to: 表示目标路由的链接。当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个 string 或者是描述目标位置的对象。
2. replace: 表示设置 replace 属性的话，当点击时，会调用 router.replace()，而不是 router.push()，所以导航后不会留下历史记录。
... [详细看文档](https://next.router.vuejs.org/zh/api/)
