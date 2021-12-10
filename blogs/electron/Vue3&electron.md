---
title: Electron
date: 2021-12-10
tags:
 - Electron
categories: 
 - Electron
---

## 安装Electron
1. 创建初始化配置
```
npm init
```
- 在package.json中应该如以下
```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```
- 打包文件为main.js main选项是必须的 author 和 license 在运行时是可选 当打包的时候是必须的

2. 安装electron
```
npm install --save-dev electron
```

3. 配置运行命令 在你的 package.json配置文件中的scripts字段下增加一条start命令
```
{
  "scripts": {
    "start": "electron ."
  }
}
```

4. 运行
```
npm start
```

> [详情请看官方文档](https://www.electronjs.org/)

> 使用vue3框架来创建electron
```
# 安装vue3
vue create my-project

# 安装vue3的electron
vue add electron-builder

# 运行
npm run electron:serve

# 打包
npm run electron:build
```