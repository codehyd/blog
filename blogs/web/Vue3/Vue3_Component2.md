---
title: Vue3组件（二）
date: 2021-11-11
tags:
 - Vue3
categories: 
 - Vue
---

# 非父子组件通信

> (非父子组件通信方法一:) Provide/Inject 

 1. Provide/Inject用于非父子组件之间共享数据
  - 比如有一些深度嵌套的组件，子组件想要获取父组件的部分内容
  - 在这种情况下，如果我们仍然将props沿着组件链逐级传递下去，就会非常的麻烦
  - 所以我们需要使用可以使用 Provide 和 Inject

>> App.vue ->  Home.vue -> HomeContent.vue 假如我们需要App.vue 与 HomeContent.vue 组件的通信

```vue
父组件App.vue 给 HomeContent.vue组件 通过provide 传递name
  provide:{
    name:"小米",
  }

子孙组件 HomeContent.vue 通过 inject 接收 App.vue 传递过来的 name
  inject:["name"]
```
>> 1. 假如传递的数据为响应数据 则需要使用 Vue3 的 computed 属性 (父组件传递)

```vue
<button @click="arr.push('新数据')">添加新数据</button>

data(){
  return {
    arr:['原数据'],
  }
},
provide(){
  return {
    lng:conputed(() => this.arr.length)
  }
},
```


>> 2. 接收响应数据 

```vue
<h2>{{ lng.value }}</h2>

inject:["lng"]
```

> (非父子组件通信方法二: )全局事件总线mitt库

- 需要安装第三方库 mitt

``` vue
# 安装
npm install mitt

# 导入并封装 mitt库 建议封装utils工具库 这里封装路径 utils/mitt.js
import mitt from 'mitt'
const emitter = mitt()
export default emitter

# 引入 mitt 的 emitter 方法
import emitter form '路径 utils/mitt.js'

# 使用
1. 父组件(传递)
<button @click="btnClick">按钮点击</button>
export default {
  methods: {
    btnClick() {
      emitter.emit("why", {name: "why", age: 18});
    }
  }
}

2. 关联组件(接收)
export default {
  created() {
    // 监听关于why 
    emitter.on("why", (info) => {
      console.log("why:", info);
    });
    // 监听全部
    emitter.on("*", (type, info) => {
      console.log("* listener:", type, info);
    })
  }
}

注意: 接收和传递的组件都需要引入mitt.js
```
1. 取消监听mitt事件函数 
``` js
// 取消所有
emitter.all.clear() 

// 定义函数方法
function onFoo (){}
emitter.on('foo',onFoo) // 监听
emitter.off('foo',onFoo) // 取消监听
```

# 插槽的使用(slot)

> 在开发中，我们会经常封装一个个可复用的组件
  - 前面我们会通过props传递给组件一些数据，让组件来进行展示
  - 但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等这些元素
  - 比如某种情况下我们使用组件，希望组件显示的是一个按钮，某种情况下我们使用组件希望显示的是一张图片
  - 我们应该让使用者可以决定某一块区域到底存放什么内容和元素

> 使用插槽
  - Vue中将 <slot> 元素作为承载分发内容的出口
  - 在封装组件中，使用特殊的元素<slot>就可以为封装组件开启一个插槽
  - 该插槽插入什么内容取决于父组件如何使用

``` vue
# 子组件
<div>
  <slot></slot>
</div>

# 父组件
<cpn>
  <h2>我是插槽</h2>
</cpn>
```

## 具名插槽

1. 具名插槽顾名思义就是给插槽起一个名字，<slot> 元素有一个特殊的 attribute：name
2. 一个不带 name 的slot，会带有隐含的名字 default
3. 语法: 
```vue
# 在父组件中cpn组件内
<cpn>
  <template v-slot:slotName>
    <h2> 我是具名插槽的内容</h2>
  <template>
</cpn>
```
4. 缩写: (v-slot:) = (#)

# 作用域插槽

> 在Vue中渲染也是有作用域的
  - 父级模板里的所有内容都是在父级作用域中编译的
  - 子模板里的所有内容都是在子作用域中编译的

## 使用作用域插槽

> 作用域插槽可以访问子组件的数据内容

```vue
# 子组件  把data的数据传递给外部
<slot :data="data"></slot>

# 父组件  接收data数据  通过v-slot访问子组件传递的 数据
<template v-slot=slotProps">
  <h2>{{ slotProps.data }}</h2>
</template>
```