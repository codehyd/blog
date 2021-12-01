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
export const mixin = {
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

# Vue3 数据响应式
> 在Vue3中 setup返回值只能在template模板中渲染并且编译出来 但是不会进行数据的响应式
## reactive 函数
- reactive函数是vue内置的一个响应式函数
- 通过reactive函数包裹的数据会变成响应式的数据

```vue
<template>
  <div>{{state.data}}</div>
  <button @click="increment">+1</button>
</template>
# 使用 reactive 函数
import { reactive } from 'vue'

setup(){
  let state = reactive({
    count:'100'
  })
  # 局部函数
  const increment = () => {
    state.counter++;
  }
  return {
    data,
    increment
  }
}
```


## ref 函数
> ref函数会对相对一些简单的数据类型的数据(String | Number | Boolean)也进行一个响应式的效果

```vue
<template>
  <div>{{state.value}}</div>
  <button @click="increment">+1</button>
</template>

import { ref } from 'vue'

setup(){
  let state = ref(100)
  # 局部函数
  const increment = () => {
    state.value++;
  }
  return {
    data,
    increment
  }
}
```

> 注意事项: ref 与 reactive 函数的区别在于传值的类型不同 但是ref函数需要通过 (.value) 的方式来获取对应的值 而reactive不用

## readonly 函数

> ref 与 reactive 函数可以获取一个响应式对象 readonly是一个只读属性 因为他是一个proxy 但是他的set方法被劫持并且不能对数据进行一个修改

- readonly 函数传入数据的类型
1. 普通对象
2. reactive 返回的对象
3. ref 返回的对象


> 再使用readonly的时候有以下规则

1. readonly返回的对象都是不允许修改的
2. 但是经过readonly处理的原来的对象是允许被修改的
 - 比如 const info = readonly(obj)，info对象是不允许被修改的
 - 当obj被修改时，readonly返回的info对象也会被修改
 - 但是我们不能去修改readonly返回的对象info
3. 其实本质上就是readonly返回的对象的setter方法被劫持了而已


# computed 计算属性
```vue
# 需要引用computed函数
import { computed, ref } from 'vue'

# 在setup函数内使用
setup(){
  const count = ref(0)
  # 使用方法一: 传入一个getting函数
  const value = computed(()=>{
    return count
  })

  # 使用方法二: 传入一个具有 get 和 set 的对象
  const value2 = computed({
    get:()=>{
      return count
    },
    set:(val)=>{
      return val
    }
  })
  return{
    value,
    value2
  }
}
```

# 侦听数据的变化
> 在 vue3 中侦听数据的方法分别是 watch | watchEffect

- watch 需要我们手动去指定侦听的数据源
- watchEffect用于在该函数中自动去收集响应式的数据依赖

> watchEffect
1. watchEffect的使用
```vue
# 需要引入watchEffect函数
import { watchEffect, ref } from 'vue'

setup(){
  const count = ref(10)
  const changeCount = ()=>{
    count.value++
  }

  # 使用 watchEffect 函数侦听数据
  watchEffect(()=>{
    # 在watchEffect函数中 如果函数体内有响应式数据则会触发该函数
    console.log('count',count.value)
  })
  return {
    count,
    changeCount
  }
}
```

2. 停止watchEffect侦听
```vue
import { watchEffect, ref } from 'vue'

setup(){
  const count = ref(10)
  const changeCount = ()=>{
    count.value++
    # 我们希望count的值达到15停止watchEffect的侦听
    if(count.value == 15){
      stopWatch()
    }
  }

  # 需要给watchEffect函数赋值一个变量 使用该变量则可以停止
  const stopWatch = watchEffect(()=>{
    console.log('count',count.value)
  })
  return {
    count,
    changeCount
  }
}
```

3. 清除watchEffect的副作用
- 比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器，或者侦听器侦听函数被再次执行了。
- 那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用
```vue
import { watchEffect, ref } from 'vue'

setup(){
  const count = ref(10)
  const changeCount = ()=>{
    count.value++
    # 我们希望count的值达到15停止watchEffect的侦听
    if(count.value == 15){
      stopWatch()
    }
  }

  # 在watchEffect传入的函数被回调时 会获得一个形参: (onInvalidate) 形参需要传入一个函数 该函数内需要做一些终止的操作(作用于异步函数)
  const stopWatch = watchEffect((onInvalidate)=>{
    console.log('count',count.value)
    # 模拟网络请求
    const request = setTimeout(() => {
      console.log('模拟网络请求发送');
    }, 2000);
    onInvalidate(() => {
      clearInterval(request)
    })
  })
  return {
    count,
    changeCount
  }
}
```

4. watchEffect的执行时机
- 在默认情况下 watchEffect函数在DOM还未挂载的时候会执行副作用函数

5. 改变watchEffect触发的时机
```vue
# watchEffect函数中传入第二个参数为配置对象 默认的配置属性 flush 为 pre 他会在元素挂载或更新之前执行
watchEffect(()=>{},{
  flush: "pre",
  # post可以避免副作用，在DOM更新后运行副作用，确保模板引用与DOM保持同步，并引入正确的元素。
  flush: "post",
  # 这会强制效果始终同步触发。然而，这是低效的，应该很少需要。
  flush: "sync", 
})
```
> watch的使用
- watch需要侦听特定的数据源，并在回调函数中执行副作用
- 默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调

1. watch侦听单个数据源
- 注意: watch也是需要引入
```
import { watch } from 'vue'
```
> 方法一: 传入getter函数：但是该getter函数必须引用可响应式的对象（比如reactive或者ref）
```js
setup(){
  const count = ref(10)

  watch(()=>count,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
  })

  return {
    count
  }
}
```
> 方法二: 直接写入一个可响应式的对象，reactive或者ref（比较常用的是ref）

```js
setup(){
  const count = ref(10)

  watch(count,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
  })
  
  return {
    count
  }
}
```

2. watch侦听多个数据源
- 案例一: 监听多个ref对象
```js
setup(){
  const count = ref(10)
  const count2 = ref(20)

  watch([count,count2],(newValues,oldValues)=>{
    console.log(newValues,oldValues)
  })

  return {
    count,
    count2
  }
}
```

- 案例二: 监听数组或者对象 可以使用getting函数
```js
setup(){
  const names = reactive(['小明','小红','小兰'])

  watch(()=>[...names],(newValue,oldValue)=>{
    console.log(newValue,oldValue)
  })

  return {
    names
  }
}
```

3. watch的选项
- 在watch函数中的第二个参数中是设置传入options的
```js
watch(()=>{},{
  // 深度监听
  deep: true,
  // 立即执行
  immediate: true
})
```
> watchEffect 与 watch的区别
- watch是懒执行副作用（第一次不会直接执行）
- watch访问侦听状态变化前后的值
- watch更具体的说明当哪些状态发生变化时，触发侦听器的执行

