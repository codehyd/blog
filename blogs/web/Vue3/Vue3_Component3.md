---
title: Vue3组件（三）
date: 2021-11-13
tags:
 - Vue3
categories: 
 - Vue
---

# 动态组件

> 组件切换的方法 
1. 通过v-if来判断 并且显示不同的 组件
2. 通过动态组件的方法

> 动态组件的实现方法
- 动态组件是使用component组件  通过一个 is 属性来实现

```vue
<component :is="cpnName"></component>
```

# 认识Keep-alive
> 在默认情况下我们切换组件后会被销毁的 再次回来则重新创建该组件
- 如果我们不希望组件随便销毁则可以使用<keep-alive></keep-alive>

```vue
<keep-alive>
  <cpn><cpn>
</keep-alive>
```
## keep-alive属性
- include (String | regExp | Array) 通过组件的名称匹配到的组件会被缓存
- exclude (String | regExp | Array) 通过组件的名称匹配到组件都不会被缓存
- max (String | String) 最多可以缓存多少组实例 一旦超过了这个数字 则缓存组件中最近没有被访问的实例会被销毁

# 异步组件
> 如果项目过大则打包后会将所有的文件打包到一个app.js里面 会造成首屏加载速度过慢 对于某些组件我们希望通过异步的方式来进行加载(目的是可以对其进行分包处理)

1. webpack代码分包

- 在webpack的特性中 在构造整个组件树的过程中  因为组件和组件之间是通过模块化直接依赖的 那么webpack在打包时就会就将组件模块打包到一起(app.js)
- 随着项目的不断庞大 app.js内容过大就会造成首屏的渲染速度变慢
- 在打包时 对于一些不需要立刻使用的组件 我们可以单独的对他们进行拆分 
- 通过import()函数可以达到分包的效果
```js
import('路径') // 会返回Promise对象
```
2. Vue3中实现异步组件 
- 因为vueCli是基于webpack的  在Vue3中提供了一个函数  defineAsyncComponent
  - defineAsyncComponent接受两种类型的参数
  1. 类型一：工厂函数，该工厂函数需要返回一个Promise对象
  2. 类型二：接受一个对象类型，对异步函数进行配置

```js
import { defineAsyncComponent } from 'vue'
// 工厂函数写法
const AsyncCpn = defineAsyncComponent (() => import('路径'))

// 对象类型写法
const AsyncCpn = defineAsyncComponent({
  // 直接写loader相当于和工厂函数写法一样
  loader: () => import('路径'),

  // 加载过程中显示的组件
  loadingComponent: LoadingCpn,

  // 加载过程中显示的组件
  errorComponent: ErrorCpn,

})

//  注意: 获取到异步组件对象后在components属性注册异步组件
```

# $refs的使用

> 在特殊情况下我们需要获取到组件或者Dom元素的实例对象 可以通过$refs属性来获取
- 在vue开发中是不推荐使用DOM操作元素的
- 在Dom元素或者组件绑定ref属性后可以通过$refs来获取相应的组件实例对象

```vue
<p ref="myP">我是p元素</p>
<Cpn ref="cpn">我是Cpn元素</Cpn>

# this.$refs.myP (获取到myP的Dom元素对象)
# this.$refs.cpn (获取到cpn的组件实例对象)
```

# $parent和$root
> 我们可以通过$parent来访问父元素 通过$root来访问根元素
- 用法与$refs类似


# 认识生命周期

> 在组件中我们会有一些列的钩子函数 在某个时间点会被Vue调用进行回调

- 每个组件都可能会经历从创建、挂载、更新、卸载等一系列的过程
- 在这个过程中的某一个阶段，用于可能会想要添加一些属于自己的代码逻辑（比如组件创建完后就请求一些服务器数据）

>>生命周期的过程
```vue
beforeCreate(组件初始化前)
created(组件初始化后)
beforeMount(组件开始挂载前)
mounted(组件挂载后)
beforeUmmount(组件开始卸载前)
ummounted(组件已经卸载)
beforeUpdate(组件中虚拟Dom元素重新渲染或更新)
updated(组件渲染更新后)
```
>> 在缓存组件中的生命周期
- 对于缓存的组件来说再次进入该组件不会执行created或mounted等生命周期
- 这个时候我们可以使用activated 和 deactivated 这两个生命周期钩子函数来监听
```vue
activated(组件被激活)
deactivated(组件失去激活状态时)
```

# 组件的 v-model

- 在表单元素中的v-model 会帮助我们做两件事情
1. 定义message
2. 在input事件中监听事件 @input="message = $event.target.value"

- 而在组件中也有v-model方法
> 在组件中v-model默认会有modelValue的值 所以在子组件中必须定义modelValue
- 通过组件的 @update:(prop) 来给父组件传递事件并且把值赋给父组件


```vue
# 父组件  
<hy-input v-model="message"></hy-input>

data(){
  return {
    message: ''
  }
}

# 子组件
<input v-model="value" />

props: {
  modelValue: String
},

// 如果是组件的v-model 则需要通过 update:(prop) 来发出该事件
emits: ['update:modelValue'],

computed: {
  value: {
    set(value) {
      // 在获取计算属性新值的时候并把事件传给父组件
      this.$emit("update:modelValue", value);
    },
    get() {
      return this.title;
    }
  }
},
```
> 多个组件 v-model 写法
```vue
# 父组件  在v-model跟上别名
<hy-input v-model:title="title"></hy-input>

data(){
  return {
    title: ''
  }
}

# 子组件
<input v-model="value" />

props: {
  title: String
},

emits: ['update:title'],

computed: {
  value: {
    set(value) {
      this.$emit("update:title", value);
    },
    get() {
      return this.title;
    }
  }
},
```