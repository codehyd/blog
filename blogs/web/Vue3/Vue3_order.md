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