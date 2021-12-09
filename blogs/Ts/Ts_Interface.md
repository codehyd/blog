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
