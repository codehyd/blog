---
title: Vue3 Composition API（一）
date: 2021-11-18
tags:
 - Vue3
categories: 
 - Vue
---

# 认识Mixin
- 如果在每一个组件中都需要同一个代码逻辑比如生命周期 业务代码逻辑等都可以使用mixin
- Mixin提供了一种非常灵活的方式，来分发Vue组件中的可复用功能
- 一个Mixin对象可以包含任何组件选项
- 当组件使用Mixin对象时，所有Mixin对象的选项将被 混合 进入该组件本身的选项中

> 创建mixin.js对象

```js
exprot const mixin = {
  created(){
    console.log('生命周期执行')
  },
}
```

> 在组件中引入
```vue
improt {mixin} from '位置'
mixins: [mixin]
```

- mixin 合并规则
1. 如果是data对象则会进行合并，如果发生冲突则会保留data对象的值
2. 如果是生命周期钩子函数则会一并合并且都会被调用
3. 如果选项为对象例如methods components 方法等都会生效 如果冲突则会取组件对象的键值对

> 全局mixin

- 一旦注册了全局mixin则全部组件都会被影响
```js
// 在main.js中
const app = createAPP(App)
app.mixin({
  created(){
    console.log('全局生命周期提示')
  },
})
```

# extends
- 类似于Mixin的方式是通过extends属性
  - 允许声明扩展另外一个组件，类似于Mixins

```vue
# 子组件
data(){
  return {
    info: 'info'
  }
},

# 父组件
import (父组件) from '父组件地址'
extends: (父组件)
// 这样可以使用 组件的info
```

# 认识Composition API

- 使用Composition API需要在vue组件中使用setup函数
- 注意 setup函数中是没有绑定this的 所以不能使用this

> setup函数的参数
1. props
- 父组件传递过来的属性会放到props对象中 如果需要使用则直接通过props参数获取
2. context
- context参数是包含了3个属性
  - attrs 所有非prop的attribute
  - slots 父组件传递过来的插槽
  - emit 组件内部如果需要发出事件则会用到


> setup返回值
- setup的返回值可以在模板template中被使用
- 也就是说我们可以通过setup的返回值来替代data选项
- 但是setup返回值不能作为响应式
- 这是因为对于一个定义的变量来说，默认情况下，Vue并不会跟踪它的变化，来引起界面的响应式操作
