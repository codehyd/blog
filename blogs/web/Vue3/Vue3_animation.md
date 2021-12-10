---
title: Vue3 动画
date: 2021-11-15
tags:
 - Vue3
categories: 
 - Vue
---

# 认识动画

> 在开发中，我们想要给一个组件的显示和消失添加某种过渡动画，可以很好的增加用户体验
- 没有动画的情况下，整个内容的显示和隐藏会非常的生硬
 - 如果我们希望给单元素或者组件实现过渡动画，可以使用 transition 内置组件来完成动画
> 在Vue3中提供了一个动画的组件 (transition) 他需要在一定的条件下才能触发
1. 条件渲染
2. 动态组件
3. 组件根节点

## transition 组件的原理
- 当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理
1. 自动嗅探目标元素是否应用了CSS过渡或者动画，如果有，那么在恰当的时机添加/删除 CSS类名
2. 如果 transition 组件提供了JavaScript钩子函数，这些钩子函数将在恰当的时机被调用
3. 如果没有找到JavaScript钩子并且也没有检测到CSS过渡/动画，DOM插入、删除操作将会立即执行

> transition 的过渡类名 (过度动画class)
```css
v-enter-from：/*定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除*/

v-enter-active：/*定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。*/

v-enter-to：/*定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除*/

v-leave-from：/*定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。*/

v-leave-active：/*定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。*/

v-leave-to：/*离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被删除)，在过渡/动画完成之后移除。*/

/* 注意 如果有属性name的时候 vue会将 v 转换为name属性值 */
```


## 同时设置过度动画

> 在开发中动画有transitionend 或 animationend 属性
- Vue 是不清楚你监听的是那个过度动画 
- 如果同时设置了这两个过度动画的属性 我们可以设置type="(transitionen | animationend)" 来告知vue监听的类型

## 显示的指定动画时间
- 我们也可以显示的来指定过渡的时间，通过 duration 属性
- duration可以设置两种类型的值
1. number类型：同时设置进入和离开的过渡时间
2. object类型：分别设置进入和离开的过渡时间

```vue
<transition name="why" type="transition" :duration="{enter: 800, leave: 1000}"></transition>
```

## 过渡的模式mode
- 在元素切换的是动画切换是有问题的
1. 这是因为默认情况下进入和离开动画是同时发生的
2. 是如果我们不希望同时执行进入和离开动画，那么我们需要设置transition的过渡模式

```vue
# in-out: 新元素先进行过渡，完成之后当前元素过渡离开
# out-in: 当前元素先进行过渡，完成之后新元素过渡进入

<transition name="why" mode="(out-in | in-out)">
  <h2 class="title" v-if="isShow">Hello World</h2>
  <h2 class="title" v-else>你好啊,李银河</h2>
</transition>
```

## appear初次渲染

> 默认情况下，首次渲染的时候是没有动画的，如果我们希望给他添加上去动画，那么就可以增加另外一个属性appear
```vue
<transition name="why" mode="(out-in | in-out)" appear>
  <h2 class="title" v-if="isShow">Hello World</h2>
  <h2 class="title" v-else>你好啊,李银河</h2>
</transition>
```

## 动画钩子函数
- 动画进入
1. @before-enter 表示在动画进入前
2. @ente 表示动画进入中
3. @before-enter 表示已经动画完成

- 动画退出
1. @before-leave 表示在动画退出前
2. @leave 表示动画退出中
3. @before-leave 表示已经动画退出