---
icon: article
title: Y.Doc
author: Align
date: 2023-08-15
category:
  - yjs.js
tag:
  - yjs

order: 7
---
# Y.Doc

```js
import * as Y from 'yjs'

const doc = new Y.Doc()
```

## Y.Doc API

**doc.clientID: number** (readonly)

会话下标识客户端的唯一id，请勿跨会话重复使用。官方的解释是哪怕是单个用户也有可能多开编辑页面，所以这些拥有同样用户身份的会话应当有不同的id用作区分，否则可能产生无法恢复的修改甚至损坏。
[FAQ](https://docs.yjs.dev/api/faq#i-get-a-new-clientid-for-every-session-is-there-a-way-to-make-it-static-for-a-peer-accessing-the-document)

**doc.gc: boolean**

是否对当前文件实例启用垃圾回收。设为false旧的文件内容将不会被回收且可恢复。[关于垃圾回收](https://docs.yjs.dev/api/internals)

**doc.transact(function(Transaction): void [, origin:any])**

发起事务，事务的概念[之前](./基础概念.md)有提到。并且可以添加origin参数，这个参数值可以通过`transaction.origin`和事件监听函数`on('update', (update, origin) => ..)`的方式访问到。

**doc.get(string, Y.[TypeClass]): [Type]**

获取顶层共享类型

**doc.getArray(string = ''): Y.Array**

定义一个共享类型Y.Array，等同于`y.get(string, Y.Array)`

**doc.getMap(string = ''): Y.Map**

定义一个共享类型Y.Map，等同于`y.get(string, Y.Map)`

**doc.getXmlFragment(string = ''): Y.XmlFragment**

定义一个共享类型Y.XmlFragment,等同于`y.get(string, Y.XmlFragment)`

**doc.destroy()**

销毁此 Y.Doc 实例。 所有事件处理程序都会被清除，并且内容也会从内存中清除，除非仍在引用它。 附加到此文档的绑定和提供程序也会被销毁。

**doc.on(eventName: string, function(event))**

自定义事件

**doc.once(eventName: string, function(event))**

自定义只执行一次的事件

**doc.off(eventName: string, function(event))**

注销自定义事件

## 事件类型

**doc.on('beforeTransaction', function(tr: Transaction, doc: Y.Doc))**

每次事务执行前触发

**doc.on('beforeObserverCalls', function(tr: Transaction, doc: Y.Doc))**

在共享类型上定义的事件监听触发前调用

**doc.on('afterTransaction', function(tr: Transaction, doc: Y.Doc))**

事务执行后调用

**doc.on('update', function(update: Uint8Array, origin: any, doc: Y.Doc, tr: Transaction))**

收到更新消息时

**doc.on('updateV2', function(update: Uint8Array, origin: any, doc: Y.Doc, tr: Transaction))**

收到更新消息时(实验中的事件，官方描述速度比原来的快十倍)

**doc.on('subdocs', function(changes: { loaded: Set<Y.Doc>, added: Set<Y.Doc>, removed: Set<Y.Doc> }))**

加载子文档或添加删除子文档时会触发。

**doc.on('destroy', function(doc: Y.Doc))**

文档被销毁时触发。绑定的事件和其他功能应该在这里解绑。

## 事件触发顺序：

* `ydoc.on('beforeTransaction', event => { .. })` 事务执行前调用
* 事务已触发
* `ydoc.on('beforeObserverCalls', event => {})`事务执行后但是还没开始触发监听
* `ytype.observe(event => { .. })` - 监听器被调用
* `ytype.observeDeep(event => { .. })` - 深层监听器被调用
* `ydoc.on('afterTransaction', event => {})` -  - 事务执行完成后
* `ydoc.on('update', update => { .. })` -  - 其他客户端修改触发的更新事件
