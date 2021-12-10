---
title: JS语法
date: 2021-11-03
tags:
 - JS
categories: 
 - JS
---

## 空值合并运算符(??)
- 空值合并操作符（??）是一个逻辑操作符
- 当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

```js
const foo = null ?? 'default string';
console.log(foo);
```
-与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时

## 可选链(?.)
> 它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行

- 以下代码为例
```js
// 第一种情况 若该对象中有该需要的属性值 则可以正常输出
const people = {
  name: '小明',
  friend:{
    name:'小红'
  }
}

console.log(people.friend.name) // 小红

// 第二种情况 若该对象中不确定有没有需要的属性值 则需要在不确定的属性后面加?
const people = {
  name: '小明',
}
console.log(people.friend?.name) // underfind
```
