---
title: Git笔记整理
date: 2021-10-28
tags:
 - Git
categories: 
 - Git
---

## 安装Git

[Git安装地址](https://git-scm.com/downloads)

## 配置Git

安装完Git后需要设置用户名和邮箱地址。因为通过Git对项目管理的时候需要这些基本信息

```sh
git config --global user.name "用户名"
git config --global user.email "邮箱"
```

通过 git config --global user.name 和 git config --global user.email 配置的用户名和邮箱地址，会被写入到 C:/Users/用户名文件夹/.gitconfig 文件中。这个文件是 Git 的全局配置文件，配置一次即可永久生效。

## Git基本操作

- 初始化项目

```sh
git init
```
- 查看项目状态

```sh
git status
git status -s
```

- 跟踪文件(添加暂存区)

```sh
git add
git add .
```

- 提交更新

```sh
git commit -m "提交更新的信息"
```

- 取消已暂存文件

```sh
git reset HEAD 文件名称
```

- 跳过暂存区添加更新

```sh
git commit -a -m "提交更新的信息"
```

- 移除文件
```sh
# 从 Git 仓库和工作区同时移除
git rm -f 文件名称

# 只从 Git 仓库移除并且保留工作区
git rm --cached 文件名称
```

- 忽略文件 

需要创建 (.gitignore) 文件

```sh
# 忽略所有 .a 文件
*.a

# 忽略所有build目录的文件夹
build/

# 忽略当前目录下的build文件
/build

# 忽略build目录下所有 .pdf文件
build/**/*.pdf
```


- 查看提交历史

```sh
git log
```

## 分支

- 查看分支

```sh
git branch
```

## 创建新分支 不会切换分支

```sh
git branch newBranchName
```

## 切换分支

```sh
git checkout 现有分支
```

## 合并分支

```sh
# 需要先切换到主分支
git checkout 主分支

# 在主分支运行 git merge 合并
git merge 功能分支
```

## 删除分支

```sh
git branch -d 分支名称
```

## 推送分支到远程仓库

```sh
git push -u origin 分支别名
```