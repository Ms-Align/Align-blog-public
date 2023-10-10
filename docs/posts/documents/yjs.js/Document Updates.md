---
icon: article
title: Document Updates
author: Align
date: 2023-08-21
category:
  - yjs.js
tag:
  - yjs

order: 2
---

# Document Updates

如何与其他文档同步。

共享类型的修改都被编码并高度压缩为二进制的文档更新数据。文档更新是可交换的、关联的和幂等的。 这意味着您可以按任意顺序多次应用它们。
所有客户收到所有文档更新后都会同步。

## Update API

**Y.applyUpdate(Y.Doc, update:Uint8Array, [transactionOrigin:any])**

应用文档更新。同时可以通过配置transactionOrigin指定过滤事务的来源，这些来源可以通过`transaction.origin` 或者 `ydoc.on('update', (update, origin) => ..)`获取到。

**Y.encodeStateAsUpdate(Y.Doc, [encodedTargetStateVector:Uint8Array]): Uint8Array**

将当前文档编码成更新数据，这些数据可被其他文档应用。通过配置`encodedTargetStateVector`可以只将产生的差异写入更新消息。

**Y.encodeStateVector(Y.Doc): Uint8Array**

计算状态向量并将其编码到 Uint8Array 中。 状态向量描述本地客户端的状态。 远程客户端可以使用它来仅交换缺失的差异

**ydoc.on('update', eventHandler: function(update: Uint8Array, origin: any, doc: Y.Doc))**

收听 Yjs 文档的增量更新。 这是 Y.Doc API 的一部分。 将计算出的增量更新发送到所有连接的客户端，或将其存储在数据库中。

**Y.logUpdate(Uint8Array)**(experimental)

将文档更新的内容记录到控制台。 该实用函数仅用于调试和理解 Yjs 文档格式。 它被标记为实验性的，因为它可能随时更改或删除。

## Alternative Update API

It is possible to sync clients and compute delta updates without loading the Yjs document to memory. Yjs exposes an API to compute the differences directly on the binary document updates. This allows you to sync efficiently while only maintaining the compressed binary-encoded document state in-memory. 
Note that this feature only merges document updates and doesn't garbage-collect deleted content. You still need to load the document to a Y.Doc to reduce the document size.



无需将 Yjs 文档加载到内存即可同步客户端并计算增量更新。 Yjs 公开了一个 API 来直接计算二进制文档更新的差异。 这使您可以高效同步，同时仅在内存中维护压缩的二进制编码文档状态。 （参见示例）
请注意，此功能仅合并文档更新，不会对已删除的内容进行垃圾收集。 您仍然需要将文档加载到 Y.Doc 以减小文档大小。

**Y.mergeUpdates(Uint8Array[]): Uint8Array**

将多个文档更新合并为单个文档更新，同时删除重复信息。 由于压缩编码，合并的文档更新始终小于单独的更新。

**Y.encodeStateVectorFromUpdate(Uint8Array): Uint8Array**

根据文档更新计算状态向量并将其编码到 Uint8Array 中。

**Y.diffUpdate(update: Uint8Array, stateVector: Uint8Array): Uint8Array**

Encode the missing differences to another update message. This function works similarly to `Y.encodeStateAsUpdate(ydoc, stateVector)` but works on updates instead.

将缺失的差异编码为另一条更新消息。 此函数的工作方式与 Y.encodeStateAsUpdate(ydoc, stateVector) 类似，但适用于更新。

## Examples

### Example: Listen to update events and apply them on a remote client

监听更新事件并将更新应用到远程客户端。

```js
const doc1 = new Y.Doc()
const doc2 = new Y.Doc()

doc1.on('update', update => {
  Y.applyUpdate(doc2, update)
})

doc2.on('update', update => {
  Y.applyUpdate(doc1, update)
})

// All changes are also applied to the other document
doc1.getArray('myarray').insert(0, ['Hello doc2, you got this?'])
doc2.getArray('myarray').get(0) // => 'Hello doc2, you got this?'
```

还可以通过来指定事务来源。对来源的数据过去去除一些冗余的数据包。

```js
doc1.on('update', (update, origin) => {
  if (origin !== 'doc1') {//来自自身的冗余数据包
    return
  }
  Y.applyUpdate(doc2, update)
})

doc2.on('update', (update, origin) => {
  if (origin !== 'doc2') {//来自自身的冗余包
    return
  }
  Y.applyUpdate(doc1, update)
})

doc1.transact( ()=> {
  doc1.getArray('myarray').insert(0, ['Hello doc2, you got this?'])
}, 'doc1')
```

### Syncing clients(同步客户端)

Yjs internally maintains a state vector that denotes the next expected clock from each client. In a different interpretation, it holds the number of modifications created by each client. When two clients sync, you can either exchange the complete document structure or only the differences by sending the state vector to compute the differences.

Yjs 内部维护一个状态向量，表示每个客户端的下一个预期时钟。 在不同的解释中，它保存每个客户端创建的修改的数量。 当两个客户端同步时，您可以交换完整的文档结构，也可以通过发送状态向量来计算差异，仅交换差异。

#### Example: Sync two clients by exchanging the complete document structure

通过交换两个完整的文档来同步数据

```js
const state1 = Y.encodeStateAsUpdate(ydoc1)
const state2 = Y.encodeStateAsUpdate(ydoc2)
Y.applyUpdate(ydoc1, state2)
Y.applyUpdate(ydoc2, state1)
```

#### Example: Sync two clients by computing the differences

通过比较两个文档的差异来同步数据。

This example shows how to sync two clients with a minimal amount of data exchanged by computing the differences using the state vector of the remote client. Syncing clients using the state vector requires another roundtrip but can save a lot of bandwidth.

示例演示如何通过使用远程客户端的状态向量计算差异来同步两个客户端，并以最少量的数据交换进行同步。 使用状态向量同步客户端需要另一次往返，但可以节省大量带宽。


```js
const stateVector1 = Y.encodeStateVector(ydoc1)
const stateVector2 = Y.encodeStateVector(ydoc2)
const diff1 = Y.encodeStateAsUpdate(ydoc1, stateVector2)
const diff2 = Y.encodeStateAsUpdate(ydoc2, stateVector1)
Y.applyUpdate(ydoc1, diff2)
Y.applyUpdate(ydoc2, diff1)
```

#### Example: Syncing clients without loading the Y.Doc

```js
// 将当前文档转化为二进制格式
let currentState1 = Y.encodeStateAsUpdate(ydoc1)
let currentState2 = Y.encodeStateAsUpdate(ydoc2)

// 现在即使我们没有文档实例也可以进行数据同步
ydoc1.destroy()
ydoc2.destroy()
//获得出两个文档的状态向量
const stateVector1 = Y.encodeStateVectorFromUpdate(currentState1)
const stateVector2 = Y.encodeStateVectorFromUpdate(currentState2)

//计算出两个文档之间的差异
const diff1 = Y.diffUpdate(currentState1, stateVector2)
const diff2 = Y.diffUpdate(currentState2, stateVector1)

// 同步客户端
currentState1 = Y.mergeUpdates([currentState1, diff2])
currentState2 = Y.mergeUpdates([currentState2, diff1])
```

### Example: Base64 encoding(Base64编码)

We compress document updates to a highly compressed binary format. Therefore, document updates are represented as Uint8Arrays. An Uint8Array represents binary data similarly to a NodeJS' Buffer . The difference is that Uint8Array is available in all JavaScript environments. The catch is that you can't JSON.stringify/JSON.parse the data because there is no JSON representation for binary data. However, most communication protocols support binary data. If you still need to transform the data into a string, you can use Base64 encoding. For example, by using the js-base64 library.

我们将文档更新压缩为高度压缩的二进制格式。 因此，文档更新表示为 Uint8Arrays。 Uint8Array 表示二进制数据，类似于 NodeJS 的 Buffer 。 不同之处在于 Uint8Array 在所有 JavaScript 环境中都可用。 问题是您无法 JSON.stringify/JSON.parse 数据，因为二进制数据没有 JSON 表示形式。 然而，大多数通信协议都支持二进制数据。 如果仍需要将数据转换为字符串，可以使用 Base64 编码。 例如，通过使用 js-base64 库

```js
import { fromUint8Array, toUint8Array } from 'js-base64'

const documentState = Y.encodeStateAsUpdate(ydoc) // is a Uint8Array
// Transform Uint8Array to a Base64-String
const base64Encoded = fromUint8Array(documentState)
// Transform Base64-String back to an Uint8Array
const binaryEncoded = toUint8Array(base64Encoded)
```

### Example: Building a custom provider

构建一个提供者。

A "provider" is what connects a Yjs document to other clients (through a network) or that synchronizes a document with a database. The section syncing clients explains several concepts to sync a Yjs document with another client or server. Once the initial states are synchronized, we want to synchronize incremental updates by listening to the update and forwarding them to the other clients. We can use the concept of transaction origin to determine whether we need to forward a document update to the database/network. I recommend using the following template for custom provider implementation.

“提供者”是将 Yjs 文档连接到其他客户端（通过网络）或将文档与数据库同步的东西。 同步客户端部分解释了将 Yjs 文档与另一个客户端或服务器同步的几个概念。 一旦初始状态同步，我们希望通过监听更新并将其转发到其他客户端来同步增量更新。 我们可以使用事务起源的概念来确定是否需要将文档更新转发到数据库/网络。 我建议使用以下模板来实现自定义提供程序。

```js
import * as Y from 'yjs'
import { Observable } from 'lib0/observable'

class Provider extends Observable {
  /**
   * @param {Y.Doc} ydoc
   */
  constructor (ydoc) {
    super()
    //监听本地文档状态变化
    ydoc.on('update', (update, origin) => {
      // 忽视自身的更新信息
      if (origin !== this) {
        // this update was produced either locally or by another provider. 
        this.emit('update', [update])
      }
    })
    // 监听远程数据变化
    this.on('update', update => {
      Y.applyUpdate(ydoc, update, this) // the third parameter sets the transaction-origin
    })
  }
  //..
}
```

Note that this is not the only way to filter updates. You could also use a isLocal flag or use a lib0/mutex. However, it is recommended that all providers set the transaction origin which makes it easier for developers to debug where an update comes from.

请注意，这不是过滤更新的唯一方法。 您还可以使用 isLocal 标志或使用 lib0/mutex。 但是，建议所有提供商设置事务来源，以便开发人员更容易调试更新的来源。
