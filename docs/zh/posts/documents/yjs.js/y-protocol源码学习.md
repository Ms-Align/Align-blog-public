---
icon: article
title: y-protocol源码学习
author: Align
date: 2023-09-15
category:
  - yjs.js
tag:
  - yjs

order: 9
---


# y-protocol

作为一个分布式数据同步库，yjs还是设计了一些与自身相适较好的通信协议(y-protocol)的。这里我们逐行代码分析下该协议的设计思想，限于英文水平可能翻译的不够准确，可对照原文查看。

::: details 点击查看源码

```js
/**
 * @module sync-protocol
 */

import * as encoding from 'lib0/encoding.js'
import * as decoding from 'lib0/decoding.js'
import * as Y from 'yjs'


/**
 * 导入的lib0包提供了一些常用方法，由于我没用过所以我们这里只关注使用到的方法做了些什么
 * encoding：提供二进制编码方法
 * decoding：提供二进制解码方法**/


/**
 * @typedef {Map<number, number>} StateMap
 */

/**
 * * Core Yjs defines two message types:
 * • YjsSyncStep1: Includes the State Set of the sending client. When received, the client should reply with YjsSyncStep2.
 * • YjsSyncStep2: Includes all missing structs and the complete delete set. When received, the client is assured that it
 *   received all information from the remote client.
 *   
 * yjs主要约定了两个核心消息类型:
 * • YjsSyncStep1: 消息中包括了发送方客户端的状态集合。当接收到时，客户端应该回复 YjsSyncStep2类型的消息。
 * • YjsSyncStep2: 该消息包括了所有缺失的数据结构和完整的删除集合。当接收到时，代表发送方客户端已经接收到了来自远程客户端的所有信息。
 *
 * 
 * In a peer-to-peer network, you may want to introduce a SyncDone message type. Both parties should initiate the connection
 * with SyncStep1. When a client received SyncStep2, it should reply with SyncDone. When the local client received both
 * SyncStep2 and SyncDone, it is assured that it is synced to the remote client.
 * 除了上述两种消息类型外，在点对点网络中，我们也可以额外引入一个名为 "SyncDone" 的消息类型。双方中有一方想发起通信时应该使用 "SyncStep1" 开始连接。而当一个客户端收到 "SyncStep2" 时，表示发送的消息被成功接受，这时我们可以回复 "SyncDone"，表示本次通信结束。当本地客户端同时收到 "SyncStep2" 和 "SyncDone" 时，可以确保它已经与远程客户端同步完成。
 *
 * 在客户端对服务器的模式中，处理的方式会有一些不同：客户端同样通过发送YjsSyncStep1类型的消息来发起一次通信，当都服务器收到YjsSyncStep1消息时，服务器应该立即回复YjsSyncStep2类型的消息，然后再回复SyncStep1消息。同样的当客户端收到SyncStep1也是如此。我们同样可以额外引入一个SyncDone类型的消息来表示通信结束，
 * 这种通信方式更为复杂，可以应用于下面两种情况：
 * 
 * In a client-server model, you want to handle this differently: The client should initiate the connection with SyncStep1.
 * When the server receives SyncStep1, it should reply with SyncStep2 immediately followed by SyncStep1. The client replies
 * with SyncStep2 when it receives SyncStep1. Optionally the server may send a SyncDone after it received SyncStep2, so the
 * client knows that the sync is finished.  There are two reasons for this more elaborated sync model: 1. This protocol can
 * easily be implemented on top of http and websockets. 2. The server shoul only reply to requests, and not initiate them.
 * Therefore it is necesarry that the client initiates the sync.
 *
 * Construction of a message:
 * [messageType : varUint, message definition..]
 *
 * 一个消息的结构可能是这样的:[messageType : varUint, message definition..]
 * 
 * Note: A message does not include information about the room name. This must to be handled by the upper layer protocol!
 *
 * 注意消息中不要包含房间名称，这种敏感信息应该交由上层协议处理。
 * 
 * stringify[messageType] stringifies a message definition (messageType is already read from the bufffer)
 */

// 定义消息类型
export const messageYjsSyncStep1 = 0
export const messageYjsSyncStep2 = 1
// yjs更新消息
export const messageYjsUpdate = 2

/**
 * Create a sync step 1 message based on the state of the current shared document.
 * 根据当前共享文档的状态创建消息类型为messageYjsSyncStep1的消息
 *
 * @param {encoding.Encoder} encoder
 * @param {Y.Doc} doc
 */
export const writeSyncStep1 = (encoder, doc) => {
    /***
     *encoding.writeVarUint(encoder: module:encoding.Encoder, num: number) 写一个可变长度的无符号整数。可编码的最大整数为2^53。
     *encoding.writeVarUint8Array(encoder: module:encoding.Encoder, uint8Array: Uint8Array) 将一个Uint8Array附加到编码中。*/
    //将消息类型编码
  encoding.writeVarUint(encoder, messageYjsSyncStep1)
    //获取当前共享文档的向量(uint8array)
  const sv = Y.encodeStateVector(doc)
    //写入uint8array数据
  encoding.writeVarUint8Array(encoder, sv)
}

/**
 * @param {encoding.Encoder} encoder 编码器
 * @param {Y.Doc} doc 共享文档
 * @param {Uint8Array} [encodedStateVector] 文档向量
 */
export const writeSyncStep2 = (encoder, doc, encodedStateVector) => {
    //构建回复消息
  encoding.writeVarUint(encoder, messageYjsSyncStep2)
    //将step1中接受到的文档向量作为回复消息体
    //比较当前文档和远程文档的差异作为回复消息内容
  encoding.writeVarUint8Array(encoder, Y.encodeStateAsUpdate(doc, encodedStateVector))
}

/**
 * Read SyncStep1 message and reply with SyncStep2.
 *
 * 读取SyncStep1信息并回复SyncStep2消息
 * 
 * @param {decoding.Decoder} decoder The reply to the received message 对收到消息的答复
 * @param {encoding.Encoder} encoder The received message 收到的消息
 * @param {Y.Doc} doc
 */
export const readSyncStep1 = (decoder, encoder, doc) =>
    /**
     *decoding.readVarUint8Array(decoder: module:decoding.Decoder): Uint8Array 读取Uint8Array数据 */
    //编码回复消息
  writeSyncStep2(encoder, doc, decoding.readVarUint8Array(decoder))

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * 读取并应用结构，然后从y实例中删除Store。
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
export const readSyncStep2 = (decoder, doc, transactionOrigin) => {
    //读取数据并应用更改
  Y.applyUpdate(doc, decoding.readVarUint8Array(decoder), transactionOrigin)
}

/**
 * @description 写入更新消息
 * @param {encoding.Encoder} encoder
 * @param {Uint8Array} update
 */
export const writeUpdate = (encoder, update) => {
  encoding.writeVarUint(encoder, messageYjsUpdate)
  encoding.writeVarUint8Array(encoder, update)
}

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
export const readUpdate = readSyncStep2

/**
 * @param {decoding.Decoder} decoder A message received from another client 需要解码的消息，来自其他客户端或服务器
 * @param {encoding.Encoder} encoder The reply message. Will not be sent if empty.需要发送的消息，消息为空将不会被发送
 * @param {Y.Doc} doc 本地的doc
 * @param {any} transactionOrigin 本地的provider
 */
export const readSyncMessage = (decoder, encoder, doc, transactionOrigin) => {
  //获取y-protocol层的消息类型
  const messageType = decoding.readVarUint(decoder)
  switch (messageType) {
    case messageYjsSyncStep1:
        //该消息类型为step1
      readSyncStep1(decoder, encoder, doc)
      break
    case messageYjsSyncStep2:
        //该消息类型为step2
      readSyncStep2(decoder, doc, transactionOrigin)
      break
    case messageYjsUpdate:
      readUpdate(decoder, doc, transactionOrigin)
      break
    default:
      throw new Error('Unknown message type')
  }
  return messageType
}

```


::: 

