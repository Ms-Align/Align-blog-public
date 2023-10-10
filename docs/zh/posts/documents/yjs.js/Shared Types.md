---
icon: article
title: Shared Types
author: Align
date: 2023-08-16
category:
  - yjs.js
tag:
  - yjs

order: 6
---

# 共享类型

之前说过要使数据能被yjs处理就必须遵守yjs数据的规范，共享类型就是yjs提供的天然支持这些规范的数据格式，文档数据的结构应当基于这些数据类型来构建。

## Y.Map

*提供与map类型相似的公共*

```js
import * as Y from 'yjs'

//创建文档
const ydoc = new Y.Doc()

// Y.Map(下简称map或共享map)可以定义为顶层或者嵌套的类型

// Method 1: 在文档顶级，定义一个共享map
const ymap = ydoc.getMap('my map type')

// Method 2: 创建一个 共享map
const ymapNested = new Y.Map()

// 将共享map存到ymap中
ymap.set('my nested map', ymapNested)

// 常用方法
ymap.set('prop-name', 'value') // 值可以是json
ymap.get('prop-name') // => 'value'
ymap.delete('prop-name')
```

### API


**ymap.doc: Y.Doc | null** (readonly)

当前map绑定到的文档对象，未绑定时为null

**ymap.parent: Y.AbstractType | null**

当前map的父级，如果当前map在文档的顶级则该值为null

**ymap.set(key: string, value: object|boolean|string|number|Uint8Array|Y.AbstractType)**

设置值，值类型可以是shared type, Uint8Array, JSON-encodable.

**ymap.get(key: string): object|boolean|Array|string|number|Uint8Array|Y.AbstractType**

获取map值

**ymap.delete(key: string)**

删除

**ymap.has(key: string): boolean**

判断map中是否存在某值

**ymap.toJSON(): Object<string,object|boolean|Array|string|number|Uint8Array>**

将当前map转换成JSON对象

**ymap.size: number**

返回键值对的个数

**ymap.forEach(value: any, key: string, map: Y.Map)**

对每个键值对调用提供的函数

**ymap[Symbol.Iterator]: Iterator**

返回一个成员为[key, value]数组的迭代器. 允许你使用for ... of ...循环迭代数据，比如: for (const [key, value] of ymap) { .. }

**ymap.entries(): Iterator**

返回一个成员为[key, value]数组的迭代器(和上面的有啥区别官方也没说)

**ymap.values(): Iterator**

返回一个只包含值的迭代器. 这允许你只迭代值: (const value of ymap.values()) { ... }，或者将所有的值转换成一个数组: Array.from(ymap.values()).

**ymap.keys(): Iterator**

和上边的一样，不过是只返回键。

**ymap.clone(): Y.Map**

克隆一个新的共享map

**ymap.observe(function(YMapEvent, Transaction))**

对当前map添加一个监听事件回调，每次map被改变时都会同步 触发该监听。如果在监听回调中修改了map，则执行完当前回调后将会再次触发该事件。

**ymap.unobserve(function)**

注销添加的事件监听回调

**ymap.observeDeep(function(Array<Y.Event>, Transaction))**

创建一个绑定一个深层监听函数。map下的其他共享类型被修改时同样会触发回调执行。如果在监听回调中修改了map，则执行完当前回调后将会再次触发该事件。
同时参数中会接收到自身包括子元素的事件。

**ymap.unobserveDeep(function)**

注销添加的深层监听回调

### 通过一个示例来了解observe的使用

```js
ymap.observe(ymapEvent => {
    //获取触发对象
  ymapEvent.target === ymap // => true

  // 获取修改的数据
  // 方法一
  ymapEvent.keysChanged // => Set<strings>
  // 方法二
  ymapEvent.changes.keys // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>

  // sample code.
  ymapEvent.changes.keys.forEach((change, key) => {
    if (change.action === 'add') {
      console.log(`Property "${key}" was added. Initial value: "${ymap.get(key)}".`)
    } else if (change.action === 'update') {
      console.log(`Property "${key}" was updated. New value: "${ymap.get(key)}". Previous value: "${change.oldValue}".`)
    } else if (change.action === 'delete') {
      console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
    }
  })
})

ymap.set('key', 'value') // => Property "key" was added. Initial value: "value".
ymap.set('key', 'new') // => Property "key" was updated. New value: "new". Previous value: "value".
ymap.delete('key') // => Property "key" was deleted. New value: undefined. Previous Value: "new".
```

### Y.MapEvent API

**ymapEvent.keysChanged: Set`<string>`**

包含了在一个事务中所有值被修改了的键的Set

其他的API都继承自[Y.Event](https://docs.yjs.dev/api/y.event)

## Y.Array

以类似序列的结构存储类型的共享数据。

```js
import * as Y from 'yjs'

const ydoc = new Y.Doc()

// Y.Array可以定义为顶级类型或者嵌套类型

// 在doc中定义一个顶级Array类型
const yarray = ydoc.getArray('my array type') 
// 新建一个共享Array类型
const yarrayNested = new Y.Array()

// 插入到其他共享类型中
yarray.set('my nested array', yarrayNested)

// 常用方法
yarray.insert(0, [1, 2, 3]) // insert three elements
yarray.delete(1, 1) // delete second element 
yarray.toArray() // => [1, 3]
```

### API
**Y.Array.from(Array<JSON | Uint8Array | Y.AbstractType>): Y.Array**

根据现有数据创建数组

**yarray.doc: Y.Doc | null** (readonly)

当前数组绑定的文档对象，未绑定时为null

**yarray.parent: Y.AbstractType | null**

当前array的父元素。当前array为顶层类型时该属性为null

**yarray.insert(index: number, content: Array<JSON | Uint8Array | Y.AbstractType>)**

在指定索引插入内容。出于性能考虑插入的内容应该时个数组，例如在下标0处插入数字1: `yarray.insert(0, [1])`

**yarray.delete(index: number, length: number)**

从索引开始删除length个数个数据

**yarray.push(content: Array<JSON | Uint8Array | Y.AbstractType>)**

从数组尾部推入数据，类似于`yarray.insert(yarray.length, content)`

**yarray.unshift(content: Array<JSON | Uint8Array | Y.AbstractType>)**

从数组头部插入元素，类似于`yarray.insert(0, content)`

**yarray.get(index: number): JSON | Uint8Array | Y.AbstractType**

Retrieve the n-th element.

**yarray.slice([start: number [, end: number]]): Array<JSON | Uint8Array | Y.AbstractType>**

返回`start`(包括)到`end`(不包括)。负值可用于表示从末尾开始，例如获取最后一个元素`yarray.slice(-1)`;获取最后一个元素外的所有元素`yarray.slice(0, -1)`

**yarray.toJSON(): Array<JSON | Uint8Array>**

获取当前共享array的json格式数据。得到的返回值是一个包含所有元素的新数组，数组内部的共享类型同样会调用自身的toJSON方法转换为json格式。注意结果可能包含不可json编码的Uint8Arrays格式。

**yarray.forEach(function(value: any, index: number, yarray: Y.Array))**

对每个元素调用函数。可以理解成js数组的forEach

**yarray.map(function(value: any, index: number, yarray: Y.Array): T): Array**

对每个元素调用函数并将返回值作为一个数组返回。可以理解成js数组的map

**yarray[Symbol.Iterator]: Iterator**

返回共享数组的迭代器，可以通过for...of...迭代`for (const value of yarray) { .. }`

**yarray.clone(): Y.Array**

克隆当前共享数组。

**yarray.observe(function(YArrayEvent, Transaction))**

添加监听，和上述的Y.Map的observe一致。

**yarray.unobserve(function)**

参考上述Y.Map

**yarray.observeDeep(function(Array<Y.Event>, Transaction))**

参考上述Y.Map

**yarray.unobserveDeep(function)**

### 通过一个示例来了解observe的使用

yjs使用基于delta format(增量数据格式)的数据来描述数组的变化，这种数据格式是一个数组，delta format以及Y.ArrayEvent的详细信息前往[Y.Event API](https://docs.yjs.dev/api/y.event#delta-format)查看。

```js
yarray.observe(yarrayEvent => {
  yarrayEvent.target === yarray // => true

  // Find out what changed: 
  // Log the Array-Delta Format to calculate the difference to the last observe-event
  console.log(yarrayEvent.changes.delta)
})

yarray.insert(0, [1, 2, 3]) // => [{ insert: [1, 2, 3] }]
yarray.delete(2, 1) // [{ retain: 2 }, { delete: 1 }]

console.log(yarray.toArray()) // => [1, 2]

// The delta-format is very useful when multiple changes
// are performed in a single transaction
ydoc.transact(() => {
  yarray.insert(1, ['a', 'b'])
  yarray.delete(2, 2) // deletes 'b' and 2
}) // => [{ retain: 1 }, { insert: ['a'] }, { delete: 1 }]

console.log(yarray.toArray()) // => [1, 'a']
```

## Y.Text

一种描述文本和富文本类型的共享类型。

```js
import * as Y from 'yjs'

const ydoc = new Y.Doc()

// You can define a Y.Text as a top-level type or a nested type

// Method 1: Define a top-level type
const ytext = ydoc.getText('my text type') 
// Method 2: Define Y.Text that can be included into the Yjs document
const ytextNested = new Y.Text()

// Nested types can be included as content into any other shared type
ydoc.getMap('another shared structure').set('my nested text', ytextNested)

// Common methods
ytext.insert(0, 'abc') // insert three elements
ytext.format(1, 2, { bold: true }) // delete second element 
ytext.toString() // => 'abc'
ytext.toDelta() // => [{ insert: 'a' }, { insert: 'bc', attributes: { bold: true }}]
```

### API

**ytext = new Y.Text(initialContent): Y.Text**

使用现有内容创建。

**ytext.doc: Y.Doc | null** (readonly)

当前类型绑定到的文档对象

**ytext.parent: Y.AbstractType | null**(readonly)

当前类型的父节点

**ytext.length: number**(readonly)

文本长度

**ytext.insert(index: number, content: string[, format: Object<string,any>])**

在指定位置插入文本。可通过format来设置一些属性。如果不设置属性默认会采用之前文本的属性。

**ytext.format(index: number, length: number, format: Object<string,any>)**

对文本应用属性

**ytext.applyDelta(delta: Delta)**

将德尔塔文本应用到文本

**ytext.delete(index: number, length: number)**

删除从指定索引开始长度为length的文本

**ytext.toString(): string**

将Y.Text转换成不带属性的纯文本

**ytext.toDelta(): Delta**

将共享文本转化为德尔塔格式，转换后的德尔塔格式和Quill富文本编辑器的一致。

**ytext.toJSON(): string**

将共享文本转换为json格式

**ytext.clone(): Y.Text**

克隆当前共享文本

**ytext.observe(function(YTextEvent, Transaction))**

添加加监听

**ytext.unobserve(function)**

注销监听

**ytext.observeDeep(function(Array<Y.Event>, Transaction))**

添加深层监听

**ytext.unobserveDeep(function)**

### [Delta Format](./Delta Format.md)

### 下例是一个监听共享文本变化的示例：

```js
yarray.observe(yarrayEvent => {
  yarrayEvent.target === yarray // => true

  // Find out what changed: 
  // Option 1: A set of keys that changed
  ymapEvent.keysChanged // => Set<strings>
  // Option 2: Compute the differences
  ymapEvent.changes.keys // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>
  
  // sample code.
  yarrayEvent.changes.keys.forEach((change, key) => {
    if (change.action === 'add') {
      console.log(`Property "${key}" was added. Initial value: "${ymap.get(key)}".`)
    } else if (change.action === 'update') {
      console.log(`Property "${key}" was updated. New value: "${ymap.get(key)}". Previous value: "${change.oldValue}".`)
    } else if (change.action === 'delete') {
      console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`)
    }
  })
})

ymap.set('key', 'value') // => Property "key" was added. Initial value: "value".
ymap.set('key', 'new') // => Property "key" was updated. New value: "new". Previous value: "value".
ymap.delete('key') // => Property "key" was deleted. New value: undefined. Previous Value: "new".

```

### Y.TextEvent API

继承自[Y.Event](./Y.Event.md)

## Y.XmlFragment

**一种用来管理Y.Xml类型集合的共享类型。**

xml和json一样是一种共享数据的格式，微软的office文档就是使用xml格式表示的。同时由于xml格式类似于html文本，所以可以直接在浏览器上显示或者转换为浏览器dom，比如下面这个示例：

```js
import * as Y from 'yjs'

const ydoc = new Y.Doc()

// You can define a Y.XmlFragment as a top-level type or a nested type

// Method 1: Define a top-level type
const yxmlFragment = ydoc.getXmlFragment('my xml fragment')
// Method 2: Define Y.XmlFragment that can be included into the Yjs document
const yxmlNested = new Y.XmlFragment()

// Common methods
const yxmlText = new Y.XmlText()
//Y.XmlFragment插入元素需要通过数组插入
yxmlFragment.insert(0, [yxmlText])
yxmlFragment.firstChild === yxmlText
yxmlFragment.insertAfter(yxmlText, [new Y.XmlElement('node-name')])
yxmlFragment.get(0) === yxmlText // => true

//show result in dev console
console.log(yxmlFragment.toDOM())
```

### API

**yxmlFragment.doc: Y.Doc | null**(readonly)

**yxmlFragment.parent: Y.AbstractType | null**

**yxmlFragment.firstChild: Y.XmlElement | Y.XmlText | null**

第一个子元素

**yxmlFragment.length: number**

子元素个数

**yxmlFragment.insert(index: number, content: Array<Y.XmlElement | Y.XmlText>)**

**yxmlFragment.insertAfter(ref: Y.XmlElement | Y.XmlText | null, content: Array<Y.XmlElement | Y.XmlText>)**

在指定引用的元素后插入元素，需要注意的是如果引用(ref)为空那个将会在开始插入元素。

**yxmlFragment.delete(index: number, length: number)**

同Y.Array

**yxmlFragment.push(content: Array<Y.XmlElement | Y.XmlText>)**

同Y.Array

**yxmlFragment.unshift(content: Array<Y.XmlElement | Y.XmlText>)**

同Y.Array

**yxmlFragment.get(index: number): Y.XmlElement | Y.XmlText**

**yxmlFragment.slice([start: number [, end: number]]): Array<Y.XmlElement | Y.XmlText>**

同Y.Array

**yxmlFragment.toJSON(): String**

转化为json格式。返回的结果是串联的xml字符串:

`<element1>foo</element1><element2>bar</element2>`

If the fragment contains more than one XML element, the output will not be a valid XML; It will need to be placed inside a container element to be valid and parsable.(如果片段内包含多个xml元素，那么返回值将不是一个合法的XML结构。需要将其包裹子在一个元素中才能正常解析):

```js
const validDocument = `<wrapper>${yXmlFragment.toJSON()}</wrapper>`
```

**yxmlFragment.createTreeWalker(filter: function(yxml: Y.XmlElement | Y.XmlText): boolean): Iterable**

该函数会遍历所有后代(不仅仅是直接子代)，并调用filter方法执行过滤，最后返回满足过滤条件的元素的迭代器。比如过滤出所有的p节点:
```js
// Log all <p> nodes that are children of this Y.XmlFragment
for (const paragraph of yxmlFragment.createTreeWalker(yxml => yxml.nodeName === 'p')) {
  ..
}
```

**yxmlFragment.clone(): Y.XmlFragment**

**toDOM():DocumentFragment**

转换为DOM节点

**yxmlFragment.observe(function(Y.XmlEvent, Transaction))**

**yxmlFragment.unobserve(function)**

**yxmlFragment.observeDeep(function(Array<Y.Event>, Transaction))**

**yxmlFragment.unobserveDeep(function)**

### 以下是一个监听Y.XmlFragment变化的示例:

```js
yxmlFragment.observe(yxmlElent => {
  yxmlEvent.target === yarray // => true

  // Observe when child-elements are added or deleted. 
  // Log the Xml-Delta Format to calculate the difference to the last observe-event
  console.log(yxmlEvent.changes.delta)
})

yxmlFragment.insert(0, [new Y.XmlText()]) // => [{ insert: [yxmlText] }]
yxmlFragment.delete(0, 1) // [{ delete: 1 }]
```

### Y.XmlEvent API

继承自[Y.Event](./Y.Event.md)
