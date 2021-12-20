---
title: class封装axios
date: 2021-12-20
tags:
  - axios
categories:
  - axios
---

> 使用 class 封装 axios 通过 Typescript 来进行封装

## 封装 axios

> 目录结构分析

- 根目录 network 文件夹 作为 axios 封装的主要逻辑
  - request 文件夹
    1. index.ts (axios 的封装逻辑)
    2. config.ts (axios 的配置文件 配置 baseurl 等)
    3. types.ts (给 axios 添加配置)
  - testRequest 文件夹
    1. index.ts (axios 网络请求测试)
- index.ts (导出/出口文件)

> request 文件夹

1. /request/index.ts

```ts
import axios from "axios"
import type { AxiosInstance } from "axios"
import type { baseRequestConfig, requestInterceptors } from "./types"

class BASE_request {
  instance: AxiosInstance
  interceptors?: requestInterceptors

  constructor(config: baseRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)

    // 使用拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (error) => {
        return error
      }
    )
  }

  // request请求方法
  request<T>(config: baseRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config) // axios的request方法需要两个类型
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default BASE_request
```

2. /request/config.ts

```ts
let BASE_URL = ""
const TIME_OUT = 10000

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = ""
} else {
  BASE_URL = ""
}

export { BASE_URL, TIME_OUT }
```

3. /request/types.ts

```ts
import { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios"

// 为实例添加新的拦截器
export interface baseRequestConfig extends AxiosRequestConfig {
  interceptors?: AxiosInstance
}

export interface requestInterceptors<T = AxiosResponse> {
  requestInterceptors: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch: (error: any) => any
  responseInterceptors: (res: T) => T
  responseInterceptorsCatch: (error: any) => any
}

export interface IDataType {
  data: any
  code: number
}
```

> index.ts 出口文件

```ts
import request from "./request/index"

import { BASE_URL, TIME_OUT } from "./request/config"

const baseRequest = new request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 除了配置axios实例的config 还可以设置自添加的interceptors
})

export default baseRequest
```

> /testRequest/index.ts 测试文件

```ts
import baseRequest from "@/network/index"

import type { IDataType } from "@/network/request/types"

export function getTestData() {
  return baseRequest.request<IDataType>({}).then((res) => res.data)
}
```

> 在页面中使用封装好的 class 实例

```vue
<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import { getTestData } from "@/network/testRequest/index"

export default defineComponent({
  setup() {
    onMounted(() => {
      getTestData().then((res) => {
        console.log(res)
      })
    })
  },
})
</script>

<style lang="less"></style>
```
