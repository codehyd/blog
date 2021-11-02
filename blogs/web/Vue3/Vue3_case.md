---
title: Vue3的案例
date: 2021-10-29
tags:
 - Vue3
categories: 
 - Vue
---

> 计数器案例

## 原生案例代码

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

## Vue3代码演示

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

> Vue3 列表循环插入新数据演示

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
          <ul>
            // v-for 列表循环
            <li v-for="item in letters" :key="item">{{item}}</li>
          </ul>
          <button @click="insertF">插入F元素</button>
        </div>
      `,
      data: function() {
        return {
          letters: ['a', 'b', 'c', 'd']
        }
      },
      methods: {
        insertF() {
          // 在数组索引第2的位置添加 F 属性
          this.letters.splice(2, 0, 'f')
        }
      }
    }).mount('#app'); // 挂载到 #app 元素
  </script>
</body>
```

> Vue3 书籍购物车案例
  - 在界面上以表格的形式显示书籍的数据
  - 在底部显示书籍的总价格
  - 点击 + 或者 - 按钮可以增加或减少书籍的数量
  - 点击移除按钮可以将书籍移除(当书籍全部移除完毕后 显示购物车为空)

```html
  <template id="my-app">
    <template v-if="books.length > 0">
      <table>
        <thead>
          <th>序号</th>
          <th>书籍名称</th>
          <th>出版日期</th>
          <th>价格</th>
          <th>购买数量</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books">
            <td>{{index + 1}}</td>
            <td>{{book.name}}</td>
            <td>{{book.date}}</td>
            <td>{{formatPrice(book.price)}}</td>
            <td>
              <button :disabled="book.count <= 1" @click="decrement(index)">-</button>
              <span class="counter">{{book.count}}</span>
              <button @click="increment(index)">+</button>
            </td>
            <td>
              <button @click="removeBook(index)">移除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>总价格: {{formatPrice(totalPrice)}}</h2>
    </template>
    <template v-else>
      <h2>购物车为空~</h2>
    </template>
  </template>
```

```css
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}

th, td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}

.counter {
  margin: 0 5px;
}

```


```js
Vue.createApp({
  template: "#my-app",
  data() {
    return {
      books: [
        {
          id: 1,
          name: '《算法导论》',
          date: '2006-9',
          price: 85.00,
          count: 1
        },
        {
          id: 2,
          name: '《UNIX编程艺术》',
          date: '2006-2',
          price: 59.00,
          count: 1
        },
        {
          id: 3,
          name: '《编程珠玑》',
          date: '2008-10',
          price: 39.00,
          count: 1
        },
        {
          id: 4,
          name: '《代码大全》',
          date: '2006-3',
          price: 128.00,
          count: 1
        },
      ]
    }
  },
  computed: {
    // vue2: filter/map/reduce
    totalPrice() {
      let finalPrice = 0;
      for (let book of this.books) {
        finalPrice += book.count * book.price;
      }
      return finalPrice;
    },
    // Vue3不支持过滤器了, 推荐两种做法: 使用计算属性/使用全局的方法
    filterBooks() {
      return this.books.map(item => {
        const newItem = Object.assign({}, item);
        newItem.price = "¥" + item.price;
        return newItem;
      })
    }
  },
  methods: {
    increment(index) {
      // 通过索引值获取到对象
      this.books[index].count++
    },
    decrement(index) {
      this.books[index].count--
    },
    removeBook(index) {
      this.books.splice(index, 1);
    },
    formatPrice(price) {
      return "¥" + price;
    }
  }
}).mount("#app");
```

## v-model 
1. v-model双向绑定原理
```vue
# 利用 value属性绑定值 通过input事件来更改值
<input type="text" :value="message" @input="inputChange">

data() {
  return {
    message: "Hello World"
  }
},

methods: {
  inputChange(event) {
    this.message = event.target.value;
  }
}
```

2. v-model 的使用 
```vue
# 已知v-model是上面的语法糖 所以可以把 :value="message" @input="inputChange" 简写成 v-model="message"
<input type="text" v-model="message">

data() {
  return {
    message: "Hello World"
  }
},
```