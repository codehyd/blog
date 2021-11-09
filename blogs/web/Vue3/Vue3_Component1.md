---
title: Vue3组件（一）
date: 2021-11-09
tags:
 - Vue3
categories: 
 - Vue
---

# 认识组件的嵌套

> 在之前的案例中 我们通常把整个文件写在一个页面内 将所有的逻辑都放在一个组件文件中 那么这个组件就变得非常的臃肿以及难以维护

1. 所以组件化的核心思想应该是对组件进行拆分 拆分成一个个小的组件
2. 再将这些组件组合嵌套在一起 最终形成我们的应用程序

# 组件的通信

1. 在开发过程中我们会经常遇到需要组件之间的相互通信
- 比如父组件传值给子组件 让子组件显示父组件传递的数据
- 比如父组件在一次性请求了子组件需要的数据 那么需要父组件传递子组件数据 而子组件向父组件传递相应事件

2. 父子组件之间的通信
> 父组件传递给子组件：通过props属性

1. 可以通过 props 来完成组件之间的通信
 - Props是你可以在组件上注册一些自定义的attribute
 - 父组件给这些attribute赋值，子组件通过attribute的名称获取到对应的值
 - props 有两种常见的用法

```vue
# 方法一: 字符串数组写法 数组中的字符串就是attribute的名称
props:['attrs']

# 方法二: 对象类型，对象类型我们可以在指定attribute名称的同时，指定它需要传递的类型、是否是必须的、默认值等等
props: {
  # 指定类型写法
  attr: (Number | String |  Boolean | Array |  Object | Date | Function | Symbol)

  # 指定类型同时指定是否必选以及默认值
  attr: {
    type : (Number | String |  Boolean | Array |  Object | Date | Function | Symbol),
    require: true, // 是否必填
    default: "value"， // 默认值
    default(){
      return (Array | Object) // 如果指定类型为数组或者对象时 需要通过返回函数的写法
    }
  }

}
```

2. 非 prop 的 attribute

- 当我们传递组件某个属性的时候且该属性没有定义在 props 或者 cmits 中 则该属性称之为 非Prop的Attribute

  1. Attribute会继承
    - 当组件有单个根节点时，非 Prop 的 Attribute 将自动添加到根节点的 Attribute 中

  2. 禁用Attribute继承和多根节点
    - 如果我们不希望组件的根元素继承attribute，可以在组件中设置 inheritAttrs: false

```js
inheritAttrs: false
```

  3. 组件中访问非props的attribute

    - 可以使用 $attrs 来访问

```vue
# 父组件
<my-cpn data="attr"></my-cpn>

# 子组件
<div :data="$attrs.data"></div>
```

  4. 多根节点的 attribute
  - 在 Vue3 中我们可以有多个根节点 如果多个根节点的话在父组件中我们需要手动指定绑定那个子组件
```vue
# 父组件
<template>
  <my-cpn data="attr"></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
</template>
  
# 子组件 (多根节点)
<template>
  <h2>我是子组件</h2>
  <h2>我是子组件</h2>
  <h2>我是子组件</h2>
</template>

// 当以上情况的时候 DOM会渲染出 3组子组件 且如果设置了非 prop 属性的时候  设置了非 prop 属性的那一组有效
```

> 子组件传递给父组件：通过$emit触发事件

- 当子组件有一些事件发生的时候，比如在组件中发生了点击，父组件需要切换内容需要子组件传递到父组件
- 子组件有一些内容想要传递给父组件的时候需要子组件传递到父组件

1. 当我们需要子组件传递父组件的时候需要以下做法
  - 首先，我们需要在子组件中定义好在某些情况下触发的事件名称
```vue
emits:['emitName']
```
 - 其次，在父组件中以v-on的方式传入要监听的事件名称，并且绑定到对应的方法中
```vue
this.$emit('emitName',attrs) // 最后的参数可以带多个参数
```
 - 最后，在子组件中发生某个事件的时候，根据事件名称触发对应的事件
```vue
@emitName="methodName"
```

