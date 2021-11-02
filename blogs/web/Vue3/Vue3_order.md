---
title: Vue3的指令与渲染
date: 2021-10-29
tags:
 - Vue3
categories: 
 - Vue
---

## v-once指令

1. v-once用于指定元素或者组件只渲染一次
    - 当数据发生变化时，元素或者组件以及其所有的子元素将视为静态内容并且跳过
    - 该指令可以用于性能优化

## v-text指令

1. 用于更新元素的 innerText 类似于 Mustache双大括号语法
    
## v-html

1. 如果我们展示的内容本身是 html 的元素 则可以使用 v-html语法

## v-pre

1. v-pre用于跳过元素和它的子元素的编译过程，显示原始的Mustache标签

## v-cloak

1. 这个指令保持在元素上直到关联组件实例结束编译

## v-bind的绑定属性

1. 绑定属性需要使用 v-bind
  - 语法糖:  " : " (冒号)
  - 用法: 动态地绑定一个或多个属性到标签内 

```html
<body>
  <div id="app"></div>
  <script src="../js/vue.js"></script>

  <script>
    const App = {
      template: `<a :href="link">百度一下</a>`,
      data() {
        return {
          link: "https://www.baidu.com"
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
</body>
```

2. 绑定一个对象
  - 如果我们希望将一个对象的所有属性，绑定到元素上的所有属性

```html
<body>
  <div id="app"></div>
  <script src="../js/vue.js"></script>

  <script>
    const App = {
      // 表示绑定了 data属性的obj对象
      template: `<div v-bind="obj"></div>`,
      data() {
        return {
          obj:{}
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
</body>
```

## v-on绑定事件

1. 绑定元素的交互事件
  - 语法糖: @
  - 用法

```html
<!-- 监听点击事件 btn1Click -->
<button @click="btn1Click">按钮1</button>

<!-- 一个元素绑定多个事件，这个时候可以传入一个对象 -->
<div @="{click: btn1Click, mousemove: mouseMove}"></div>
```

  - 传递参数
    - 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加
    - 情况二：如果需要同时传入某个参数，同时需要event时，可以通过$event传入事件

  - 修饰符
    - stop - 调用 event.stopPropagation()。
    - prevent - 调用 event.preventDefault()。
    - capture - 添加事件侦听器时使用 capture 模式。
    - self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    - {keyAlias} - 仅当事件是从特定键触发时才触发回调。
    - once - 只触发一次回调。
    - left - 只当点击鼠标左键时触发。
    - right - 只当点击鼠标右键时触发。
    - middle - 只当点击鼠标中键时触发。
    - passive - { passive: true } 模式添加侦听器

## v-if v-else v-else-if v-show 条件渲染

-  v-if、v-else、v-else-if 用于根据条件来渲染某一块的内容
    - 这些内容只有在条件为true时，才会被渲染出来
    - 与JavaScript的条件语句if、else、else if类似
    - 当条件为true才会去渲染

- v-show和v-if的用法看起来是一致的，也是根据一个条件决定是否显示元素或者组件

- v-if 与 v-show的区别
  - v-show是不支持 template 模板
  - v-show不可以和v-else一起使用
  - v-show元素无论是否需要显示到浏览器上，它的DOM实际都是有渲染的，只是通过CSS的display属性来进行切换
  - v-if当条件为false时，其对应的原生压根不会被渲染到DOM中


## 列表渲染 v-for

- 假如需要渲染一组数据的话需要使用 v-for 来完成
  - v-for 基本格式为 
```vue
item in arr
```
  - item 是我们给每项元素起的一个别名，这个别名可以自定来定义
  - 如果需要索引值我们可以使用 (item,index) in arr
  - v-for 也可以便利对象 (支持三种语法)
```vue
value in object
(value, key) in object
(value, key, index) in object
```

- Vue 会侦听以下数组方法 当以下方法发生改变后 列表渲染的数据才相对应发生改变

```js
arr.push()
arr.ppop()
arr.pshift()
arr.punshift()
arr.psplice()
arr.psort()
arr.preverse()
```

## v-for中的key

- 在使用v-for进行列表渲染时，我们通常会给元素或者组件绑定一个key属性
  - key属性主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes
  - 如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类
  - 而使用key时，它会基于key的变化重新排列元素顺序，并且会移除/销毁key不存在的元素
  - 这能帮助我们提高性能

## VNode

- 简单来说VNode是html元素创建出来的VNode(虚拟节点)
- 事实上VNode是在Vue表示出来的一个个VNode
- VNode的本质是一个JavaScript的对象

## 虚拟DOM

- 如果我们不只是一个简单的div，而是有一大堆的元素，那么它们应该会形成一个VNode Tree


## v-model

1. v-model是表单开发中与表单元素双向绑定
  - 它会根据控件的类型自动选取正确的方法更新元素
  - 本质上v-model 是语法糖(简写) 它负责监听用户输入的事件来更新数据 对某种极端场景下进行一些他特殊的处理
  - v-model绑定的类型是string(字符串)类型

2. 修饰符的使用

  - lazy 表示提交后才会触发 并非实时绑定
```vue
<input v-model.lazy="info" />
```
  
  - number 会让字符类型转换为数字类型
```vue
<input v-model.number="info" />
```
  - trim 自动去除 前后两端的空格
```vue
<input v-model.trim="info" />
```