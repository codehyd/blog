---
title: 使用TypeScript
date: 2021-12-08
tags:
 - TypeScript
categories: 
 - TypeScript
---

> 学习Typescript[[toc]]

## 变量的声明
- 在TypeScript中定义变量都是需要指定标识符的类型
- 声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解
> var/let/const 标识符: 数据类型 = 赋值;
```ts
let num: number = 0
```

## 变量的类型推导（推断）
- 在开发中，有时候为了方便起见我们并不会在声明每一个变量时都写上对应的数据类型
- 我们更希望可以通过TypeScript本身的特性帮助我们推断出对应的变量类型


## JavaScript类型 – number类型
- TypeScript和JavaScript一样，不区分整数类型（int）和浮点型（double），统一为number类型。
- TypeScript也是支持二进制、八进制、十六进制的表示：

## JavaScript类型 – boolean类型
- boolean类型只有两个取值：true和false

## JavaScript类型 – string类型
- string类型是字符串类型，可以使用单引号或者双引号表示
- 同时也支持ES6的模板字符串来拼接变量和字符串

## JavaScript类型 – Array类型
- 数组类型需要定义数组中所有元素的类型必须为相同
- 数组类型的定义也非常简单，有两种方式
```ts
// 以字符串为例子
const arr1:String[] = ['字符1','字符2']
const arr2:Array<string> = ['字符1','字符2'] //推荐
```

## JavaScript类型 – Object类型
- 与JavaScript创建对象一样
```ts
const info = {
  name: "xxx",
  age: 18
}
```

- 注意: 根据类型推导特性 不应该随便修改对象中某个值的类型


## JavaScript类型 – Symbol类型
- Symbol类型是ES6新的类型
- 在ES5中，如果我们是不可以在对象中添加相同的属性名称的，比如下面的做法
- 通常我们的做法是定义两个不同的属性名字：比如 name1 和 name2 
- 但是我们也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值

```ts
const title1 = Symbol("title")
const title2 = Symbol('title')

const info = {
  [title1]: "xxx",
  [title2]: "xxx"
}

console.log(info[title1]);
```

## JavaScript类型 – null和undefined类型
- 在 JavaScript 中，undefined 和 null 是两个基本数据类型
- 在TypeScript中，它们各自的类型也是undefined和null，也就意味着它们既是实际的值，也是自己的类型

```ts
let n1: null = null
let n2: undefined = undefined
```

## TypeScript类型 - any类型
- 在某些情况下我们不确定一些变量是什么类型 并且会发生一些变化 
- 我们可以使用 any 类型(类似于Dart语言中的dynamic类型)
- 在 TypeScript 中 any 类型可以进行任何操作等 相当于JavaScript的做法

## TypeScript类型 - unknown类型
- unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量

- any 与unknown 的区别
1. unknown类型只能赋值给any和unknown类型
2. any类型可以赋值给任意类型

```ts
function foo() {
  return "abc"
}

function bar() {
  return 123
}


let flag = true
// 定义 unknown 类型
let result: unknown 

if (flag) {
  result = foo()
} else {
  result = bar()
}

// 因为 unknown 类型的限制 以下两行会在报错 因为 unknown 不允许赋值除(any | unknown)这两种类型的其他类型
let message: string = result // 报错
let num: number = result // 报错

console.log(result)


```

## TypeScript类型 - void类型
- void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型

## TypeScript类型 - never类型
- never 表示永远不会发生值的类型

例子: 比如switch分支中 如果进入了default分支 则该分支的变量为never类型

> never 和 void 的差异
- void 表示没有任何类型，never 表示永远不存在的值的类型。

## TypeScript类型 - tuple类型(元组类型)
- 我们知道在 Array 数组类型中元素的数据类型都是相同的 如果需要存储不同的类型数据则可以使用元组

例子: 如果我们需要给一个函数传值 函数返回两个参数 一个是传过来的值 而另一个是一个函数 
1. 通过例子得出返回的参数有两个 分别是any类型和(void)函数类型
2. 这里最好使用元组类型
```ts
function useState(state: any){
  let currentState = state

  const changeState = (newState: any) => currentState = newState

  const tuple:[any, (newState:any) => void] = [currentState, changeState]

  return tuple
}

// 对其进行解构 
const [state, setState]  = useState(10)

console.log(state, setState(20)) // 10 20
```

## Ts函数的参数类型
- TypeScript允许我们指定函数的参数和返回值的类型
- 声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型

```ts
function getNum(num: number){}

getNum(10)
getNum('10') // 报错 形参类型不是 number
```

## Ts函数的返回值类型
- 我们也可以添加返回值的类型注解，这个注解出现在函数列表的后面
- 和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的返回类型

```ts
function getNum(num: number): number{
  return num
}

getNum(10)
```

## Ts匿名函数的参数
- 匿名函数与函数声明会有一些不同
- 匿名函数可以不用声明类型

```ts
const names = ['abs','fgh','zxc']
names.forEach(item=>{})
```

- 在上面的代码块中 我们没有指定forEach函数中item的类型 但TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型
- 这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型

## Ts函数形参传入对象类型

- 如果我们需要给函数传入一个对象 则需要通过告知TypeScript对象中该属性是什么类型
- 属性之间可以使用 , 或者 ; 来分割，最后一个分隔符是可选的

```ts
function getInfo(params: {info1: string, info2: string}){}

getInfo({info1: 'aaa', info2:'bbb'})
```

## Ts可选类型
- 如果我们需要传递参数中有可选型的参数时则需要使用可选参数
- 可选类型需要在属性的后面添加一个?
- 可选类型参数默认值为undefined

```ts
function printCoord(coord: {x: number, y: number, z?: number}) {
  console.log(Coord.x,Coord.y,Coord.z)
}

printcoord({x: 123, y: 321})  // 123 321 undefined
```

## Ts联合类型
- 在TypeScript中类型系统允许我们使用多种运算符
- 若使用多种运算符则可以使用一下语法

```ts
let str:(number | string) = ''
str = '1'
str = 1
str = true // 报错
```

> 在可选类型中可以看成是 类型 和 undefined 的联合类型


## 定义类型别名
- 以多联合类型为例 如果我们在定义变量中编写众多的联合类型会让代码的阅读性很差
- TypeScript可以让我们的类型起别名(使用type关键字)  相当于变量
```ts
type strType =  number | string
let str: strType = ''
str = '1'
str = 1
str = true // 报错
```

## Ts类型断言 as
- 在某些情况下TypeScript是无法具体获取类型信息 比如:

```ts
const imgEl = document.getElementById('img') // HTMLElement 

```
- 这个时候通过获取id方法获取img元素是获取到是html元素 但是并不知道是什么具体类型
- 则我们可以使用类型断言的方法

```ts
const imgEl = document.getElementById('img') as HTMLImageElement
```

## Ts非空类型断言 (!)
- 在可选类型中如果出现以下代码 则执行ts编译会出错

```ts
function getInfo(info?: string){
  // 转换为小写
  console.log(info.toLowerCase()) 
}
console.log('hello')
```

- 原因是因为info是一个可选类型 很有可能会出现undefined 所以在编译ts的时候会报错
- 解决方法: 使用非空断言 但是我们需要确定传入的参数是有值的
  - 非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测

```ts
function getInfo(info?: string){
  // 转换为小写
  console.log(info!.toLowerCase()) 
}
console.log('hello')
```



