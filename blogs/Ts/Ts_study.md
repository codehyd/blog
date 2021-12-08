---
title: 认识TypeScript
date: 2021-12-08
tags:
 - TypeScript
categories: 
 - TypeScript
---

## 在优秀的JavaScript语言中存在有很多的缺点
- 比如ES5以及之前的使用的var关键字关于作用域的问题
- 比如最初JavaScript设计的数组类型并不是连续的内存空间
- p比如直到今天JavaScript也没有加入类型检测这一机制

> 其中类型检测这上JavaScript是毫无进展

## 而类型带来的问题
- 编程开发中我们有一个共识：错误出现的越早越好
- 能在写代码的时候发现错误，就不要在代码编译时再发现（IDE的优势就是在代码编写过程中帮助我们发现错误）
- 能在代码编译期间发现错误，就不要在代码运行期间再发现（类型检测就可以很好的帮助我们做到这一点）
- 能在开发阶段发现错误，就不要在测试期间发现错误，能在测试期间发现错误，就不要在上线后发现错误


> 我们可以将TypeScript理解成加强版的JavaScript。

## TypeScript的编译环境
- 我们需要安装TypeScript
```
# 安装命令
npm install typescript -g

# 查看版本
tsc --version
```

## TypeScript的运行环境

1. 通过webpack运行环境

2. 通过ts-node
```
#  安装ts-node
npm install ts-node -g

# 另外ts-node需要依赖 tslib 和 @types/node 两个包
npm install tslib @types/node -g

# 运行
ts-node xxx.ts
```
