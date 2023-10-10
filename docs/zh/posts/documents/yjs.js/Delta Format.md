---
icon: article
title: Delta Format
author: Align
date: 2023-08-18
category:
  - yjs.js
tag:
  - yjs

order: 4
---

# Delta Format

德尔塔格式最初由Quill富文本编辑器描述并使用。yjs试用期来表述类序列数据的变化(例如Y.Text,Y.Array,Y.XmlFragment)。

使用德尔塔格式来描述yjs共享数据的的数据状态:
```js
const ytext = ydoc.getText()

ytext.toDelta() // => []
ytext.insert(0, 'World', { bold: true })
ytext.insert(0, 'Hello ')
ytext.toDelta() // => [{ insert: 'Hello ' }, { insert: 'World', attributes: { bold: true } }]
```
在许多情况下，可以使用德尔塔格式对文档进行更改。例如在Y.Text中：

```js
ytext.insert(0, 'Hello ')
ytext.insert(6, 'World', { bold: true })
// 等同于
ytext.applyDelta([{ insert: 'Hello ' }, { insert: 'World', attributes: { bold: true } }])
```

可以看到德尔塔格式使用了一些约定的描述/字段来表示不同的操作，下面我们来介绍下这些描述。

**Delete**

```js
delta = [{
  delete: 3
}]
```
表示删除前三个字符

**Retain**

```js
delta = [{
  retain: 1
}, {
  delete: 3
}]
```

表示保留一项，删除三项，比如下面这个例子:

```js
ytext.insert(0, '12345')
ytext.applyDelta(delta)
ytext.toDelta() // => { insert: '15' }
```
(我的理解是一种序列化脚本,按顺序执行一次保留，执行三次删除)

**Insert(在Y.Text中使用时)**

插入的值应当始终为字符串，并且可以指定一些属性：
```js
delta = [{
  retain: 1
}, {
  insert: 'abc', attributes: { bold: true }
}, {
  retain: 1
}, {
  insert: 'xyz'
}]
```

下面这个示例展示了在Y.Text文本下标0处插入`123`,随后保留(跳过)数字字符串1,在1和2之间插入`abc`并设置为粗体。随后保留(跳过)字符串2，在2和3之间插入`xyz`。
个人感觉retain在德尔塔数据中类似于编辑时的光标，retain: n表示光标移动多少个字符，操作都会在‘光标’所停的位置执行(没错，我感觉自己已经懂了^_^).

```js
ytext.insert(0, '123')
ytext.applyDelta(delta)
ytext.toDelta() // => [{ insert: '1' },
                //     { insert: 'abc', attributes: { bold: true } },
                //     { insert: '2xyz3' }]
```

**Retain(在Y.Text中使用时)**

在Y.Text中使用Retain可能会包含一些属性:

```js
delta = [{
  retain: 5, attributes: { italic: true }
}]
```
表示将前五个字符设置为斜体。包含属性时类似于选取并设置属性。

**Insert (在 Y.Array & Y.XmlFragment上使用时)**

插入的值应当是个数组:

```js
yarray.observe(event => { console.log(event.changes.delta) })

yarray.insert(0, [1, 2, 3]) // => [{ insert: [1, 2, 3] }]
yarray.insert(2, ["abc"]) // => [{ retain: 2 }, { insert: ["abc"] }]
yarray.delete(0, 1) // => [{ delete: 1 }]
```

The delta format is very powerful to express changes that are performed in a Transaction. As explained in the shared types section, events are fired after transactions. With the delta format we can express multiple changes in a single event. E.g.

```js
yarray.observe(event => { console.log(event.changes.delta) })

ydoc.transact(() => {
  // perform all changes in a single transaction
  yarray.insert(0, [1, 2, 3]) // => [{ insert: [1, 2, 3] }]
  yarray.insert(2, ["abc"]) // => [{ retain: 2 }, { insert: ["abc"] }]
  yarray.delete(0, 1) // => [{ delete: 1 }]
}) // => [{ insert: [2, "abc", 3] }]

ydoc.transact(() => {
  yarray.insert(0, ['x'])
  yarray.insert(2, ['y'])
}) // => [{ insert: ['x'] }, { retain: 1 }, { insert: ['y'] }]
```
