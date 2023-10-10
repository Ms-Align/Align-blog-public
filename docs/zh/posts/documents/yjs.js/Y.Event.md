---
icon: article
title: Y.Event
author: Align
date: 2023-08-16
category:
  - yjs.js
tag:
  - yjs

order: 5
---

# Y.Event

## Y.Event API

**yevent.target: Y.AbstractType**

触发该事件的共享对象

**yevent.currentTarget: Y.AbstractType**

捕获到事件的对象。类似于浏览器事件的冒泡捕获或着事件监听，捕获到的事件的对象可能并不是触发者本身，在yjs深层监听下，触发监听事件的的对象也不一定就是当前添加了事件监听的对象，可以这么理解。
当然这是我的理解描述可能有误，官方解释如下：
The current target of the event as the event traverses through the (deep)observer callbacks. It refers to the type on which the event handler (observe/observeDeep) has been attached. Similar to [Event.currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget).

**yevent.transaction: Y.Transaction**

创建此事件的事务对象

**yevent.path: Array<String|number>**

计算从Y.Doc到修改的类型的路径。你可以通过遍历此数组来找到被改变的对象(yevent.target: 那我呢？？为什么不用我呢？？)

**yevent.changes.delta: Delta**

以array-delta format格式返回数据的变化。在[这里](https://docs.yjs.dev/api/delta-format)了解更多关于Delta Format。The text delta is only available on Y.TextEvent (`ytextEvent.delta`)

**yevent.changes.keys: Map<string, { action: 'add' | 'update' | 'delete', oldValue: any }>**

计算出共享类型属性的键值对的修改。对于Y.Map返回的时修改的键，在Y.Xml中返回的时修改的属性。
