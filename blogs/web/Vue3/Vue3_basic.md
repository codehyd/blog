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
    