---
title: Vue3的案例
date: 2021-10-29
tags:
 - Vue3
categories: 
 - Vue
---

## 计数器案例

- 原生案例代码

```html
  <body>
    <h2 class="counter">0</h2>
    <button class="increment">+1</button>
    <button class="decrement">-1</button>

    <script>
      // 1.获取所有的元素
      const counterEl = document.querySelector(".counter");
      const incrementEl = document.querySelector(".increment");
      const decrementEl = document.querySelector(".decrement");

      // 2.定义变量
      let counter = 100;
      counterEl.innerHTML = counter;

      // 3.监听按钮的点击
      incrementEl.addEventListener("click", () => {
        counter += 1;
        counterEl.innerHTML = counter;
      });
      decrementEl.addEventListener("click", () => {
        counter -= 1;
        counterEl.innerHTML = counter;
      });
    </script>
  </body>
```

- Vue3代码演示

```html
<body>
  <div id="app"></div>

  <!-- 1. CDN 引入 Vue3.js -->
  <script src="https://unpkg.com/vue@next"></script>
  <script>
    // 2. 创建 Vue 实例对象
    Vue.createApp({
      // 设置 Vue 实例的 template 模板
      template: `
        <div>
          // {{变量}} 表示 Vue data对象的属性
          <h2>{{counter}}</h2>
          // @click 表示 Vue 事件的语法糖
          <button @click='increment'>+1</button>
          <button @click='decrement'>-1</button>
        </div>
      `,
      data: function() {
        return {
          counter: 100
        }
      },
      // 定义各种各样的方法
      methods: {
        increment() {
          console.log("点击了+1");
          this.counter++;
        },
        decrement() {
          console.log("点击了-1");
          this.counter--;
        }
      }
    }).mount('#app'); // 挂载到 #app 元素
  </script>
</body>
```