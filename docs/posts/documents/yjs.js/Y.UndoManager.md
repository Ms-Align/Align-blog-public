---
icon: article
title: Y.UndoManager
author: Align
date: 2023-08-21
category:
  - yjs.js
tags:
  - yjs

order: 3
---

# Y.UndoManager


可选的yjs撤销重做管理器。

Yjs ships with a selective Undo/Redo manager. The changes can be optionally scoped to transaction origins.

```js
import * as Y from 'yjs'

const ytext = doc.getText('text')
const undoManager = new Y.UndoManager(ytext)

ytext.insert(0, 'abc')
undoManager.undo()
ytext.toString() // => ''
undoManager.redo()
ytext.toString() // => 'abc'
```

**`const undoManager = new Y.UndoManager(scope: Y.AbstractType | Array<Y.AbstractType> [, {captureTimeout: number, trackedOrigins: Set<any>, deleteFilter: function(item):boolean}])`**

在共享类型上船舰一个撤销重做管理器。如果任何指定的类型或者其子类型被修改则会向撤销重做管理器的堆栈中添加一个反向操作。或者通过`trackedOrigins`属性过滤需要跟踪修改的类型，否则默认下将跟踪本地所有类型的修改。
同时管理器内部会对事件修改做节流操作，小于`captureTimeout`时间的修改将会被合并成一个，将其设置为0即可获取到每次更改。

**`undoManager.undo()`**

撤销最新一次执行的操作，同时将相反的操作推入到redo堆栈中

**`undoManager.redo()`**

重做redo堆栈上的最后一个操作。Redo the last operation on the redo-stack. I.e. the previous redo is reversed.

**`undoManager.stopCapturing()`**

确保下次事件不会被捕获。

**`undoManager.clear()`**

清除撤销/重做堆栈中的所有操作。

**`undoManager.on('stack-item-added', {stackItem: { meta: Map<any,any>, type: 'undo'|'redo'}}`**

当操作被添加到redo/undo堆栈中时触发的事件。

**`on('stack-item-popped', { stackItem: { meta: Map<any,any> }, type: 'undo' | 'redo' })`**

操作弹出时触发的事件。

## Example: Stop Capturing

时间间隔小于`options.captureTimeout`的修改将会被合并，调用`stopCapturing`方法以确保下一次修改是独立的不会被合并。

```js
// without stopCapturing
ytext.insert(0, 'a')
ytext.insert(1, 'b')
undoManager.undo()
ytext.toString() // => '' (note that 'ab' was removed)

// with stopCapturing
ytext.insert(0, 'a')
undoManager.stopCapturing()
ytext.insert(0, 'b')
undoManager.undo()
ytext.toString() // => 'a' (note that only 'b' was removed)
```

## Example: Specify tracked origins

文档的每次修改都有其来源。如果修改的来源没有被指定，那么他默认是`null`。通过指定`trackedOrigins`属性你可以选择性的决定哪些来源的修改应该被跟踪。

```js
class CustomBinding {}

const ytext = doc.getText('text')
const undoManager = new Y.UndoManager(ytext, {
  trackedOrigins: new Set([42, CustomBinding])
})

ytext.insert(0, 'abc')
undoManager.undo()
ytext.toString() // => 'abc' (abc的更改没有被跟踪因为其来源是null，并且null不在trackedOrigins中)
ytext.delete(0, 3) // revert change

doc.transact(() => {
  ytext.insert(0, 'abc')
}, 42)
undoManager.undo()
ytext.toString() // => '' (tracked because origin is an instance of `trackedTransactionorigins`)

doc.transact(() => {
  ytext.insert(0, 'abc')
}, 41)
undoManager.undo()
ytext.toString() // => '' (not tracked because 41 is not an instance of
                 //        `trackedTransactionorigins`)
ytext.delete(0, 3) // revert change

doc.transact(() => {
  ytext.insert(0, 'abc')
}, new CustomBinding())
undoManager.undo()
ytext.toString() // => '' (tracked because origin is a `CustomBinding` and
                 //        `CustomBinding` is in `trackedTransactionorigins`)
```
上面这个示例我觉得最重要的就是展示了如何指定修改的来源以及自定义类也是可以作为`trackedOrigins`元素的。

## Example: Add additional information to the StackItems

当执行撤销或者重做操作时通常会恢复一些元信息，比如光标的位置。你可以通过添加监听事件来将这些信息恢复到操作对象中。

```js
const ytext = doc.getText('text')
const undoManager = new Y.UndoManager(ytext, {
  trackedOrigins: new Set([42, CustomBinding])
})

undoManager.on('stack-item-added', event => {
  // 当事件被添加到堆栈中时保存当前光标位置
  event.stackItem.meta.set('cursor-location', getRelativeCursorLocation())
})

undoManager.on('stack-item-popped', event => {
  // 恢复光标位置
  restoreCursorLocation(event.stackItem.meta.get('cursor-location'))
})
```

