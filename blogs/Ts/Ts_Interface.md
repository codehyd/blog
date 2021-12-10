---
title: TypeScript接口
date: 2021-12-09
tags:
 - TypeScript
categories: 
 - TypeScript
---

## Ts接口的使用
- 通过类型(type)别名来声明对象类型是:
```ts
type objType = {name: string, age: number}
```
- 而另一种声明对象类型的是接口: interface
```ts
interface objType{
  name: string,
  age: number
}
```
> 两种声明对象类型都是可以的

## Ts联合类型和接口
- 在定义接口也可以使用联合类型
```ts
interface RunOptions { 
  program:string; 
  // 既可以是字符串数组 | 字符串 | 返回字符串的函数 这三种类型
  commandline:string[]|string|(()=>string);  
} 
```

## Ts索引类型
- 如果我们希望对象中的key是number类型 value的值是string类型的时候 我们可以通过索引类型来实现
```ts
interface namelist { 
  [index:number]:string 
} 

let obj: namelist = {
  1: '小明',
  'a':'小红' //  报错 因为 'a'不是number类型
}

// 在数组中接口也可以让我们将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串。

var list2:namelist = ["John",1,"Bran"] // 错误元素 1 不是 string 类型
```

## interface和type区别
- 我们会发现interface和type都可以用来定义对象类型，那么在开发中定义对象类型时，到底选择哪一个呢
  - 如果是定义非对象类型，通常推荐使用type
- 如果是定义对象类型，那么他们是有区别的
  - interface 可以重复的对某个接口来定义属性和方法
  - 而type定义的是别名，别名是不能重复的