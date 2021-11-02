---
title: Vue3基础语法
date: 2021-10-29
tags:
 - Vue3
categories: 
 - Vue
---

## data属性

1. data属性是传入一个函数，并且该函数需要返回一个对象
    - 在Vue2.x的时候，也可以传入一个对象（虽然官方推荐是一个函数
    - 在Vue3.x的时候，必须传入一个函数，否则就会直接在浏览器中报错

2. data中返回的对象会被Vue的响应式系统劫持，之后对该对象的修改或者访问都会在劫持中被处理
    - 所以我们在template中通过 {{counter}} 访问 data对象的counter，可以从对象中获取到数据
    - 所以我们修改counter的值时，template中的 {{counter}}也会发生改变

## methods属性

1. methods属性是一个对象，通常我们会在这个对象中定义很多的方法
    - 这些方法可以被绑定到 template 模板中
    - 在该方法中，我们可以使用this关键字来直接访问到data中返回的对象的属性
    - 不能使用箭头函数 (使用了箭头函数this的指向会指向window)

## Mustache双大括号语法

1. 如果我们希望把数据显示到模板（template）中，可以使用 “Mustache” (双大括号) 语法
    - 当data中的数据发生改变时，对应的内容也会发生更新
    - 双大括号中也可以是JavaScript表达式
    
## computed计算属性

1. 计算属性的作用
    - 对于任何包含响应式数据的复杂逻辑都可以使用计算属性
    - 计算属性和 methods 的区别是计算属性是有缓存的 也就是说多次调用计算属性 和 methods 后 计算属性只执行一次 methods 需要调用多次 所以计算属性是有缓存 当我们多次使用计算属性时 计算属性只会执行一次
```vue
computed:{
    computedName(){
        定义计算属性方法
    }
}
```

2. 计算属性 getting 和 setting 方法
    - 在大多数情况下只需要 get 方法 所以可以简写成函数
```vue
# 计算属性只有 get 属性时
computedName(){
    return xxx
}

# 当计算属性需要 set 属性时
computedName:{
    get(){

    },
    set(val){

    }
}
```
3. set 属性会返回最新的值

## watch侦听器
1. 侦听器的使用
    - 如果希望在逻辑代码中监听某个数据的变化 这个时候需要用侦听器watch来完成
    - 可以侦听 data属性 和 computed计算属性的值
```vue
watch:{
    watchName(newValue,oldValue){
        侦听器会返回两个值
        newValue: 侦听后的值(最新改变的值) 
        oldValue: 侦听前的值(还未改变之前的值) 
    }
}
```

2. 侦听器配置选项
    - 在默认情况下侦听器只会侦听数据的改变 则不能侦听数据内部的改变比如改变对象内的某个值或数组内的某个值 所以需要进行watch配置
    - 如果监听的数据改变时 数据类型为数组或对象时 则 newValue 和 oldValue 的值会指向同一个对象或数组  Vue不会保留之前更改的副本
```vue
watch:{
    watchName:{
        handler(newValue,oldValue){
            // 这一种方法与上面watch方法一样
        },
        deep: true, // 深度侦听 可以侦听复杂数据类型内的数据
        immediate: true // 立即执行 相当于先执行一次监听
            
    }
}
```




