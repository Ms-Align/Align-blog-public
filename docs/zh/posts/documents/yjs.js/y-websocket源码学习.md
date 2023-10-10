---
icon: article
title: y-websocket源码学习
author: Align
date: 2023-09-15
category:
  - yjs.js
tag:
  - yjs

order: 9
---

官方的同步示例我觉得还是很有参考价值的，值得深入学习下，所以这里扒了下源码。需要注意的是这里面涉及到了[yjs](基础概念.md)和[y-protocols](y-protocol源码学习.md)。请务必先了解这两个库。


::: details 点击查看源码

```js


/**
 * @module provider/websocket
 */

/* eslint-env browser */

import * as Y from 'yjs' // eslint-disable-line
import * as bc from 'lib0/broadcastchannel.js' //基于localstore实现的跨标签通信。
import * as time from 'lib0/time.js'//时间模块
import * as encoding from 'lib0/encoding.js'
import * as decoding from 'lib0/decoding.js'
import * as syncProtocol from 'y-protocols/sync.js'
import * as authProtocol from 'y-protocols/auth.js'
import * as awarenessProtocol from 'y-protocols/awareness.js'
import * as mutex from 'lib0/mutex.js'//互斥锁模块
import { Observable } from 'lib0/observable.js' //观察者模块
import * as math from 'lib0/math.js' //数学模块
import * as url from 'lib0/url.js' //url模块 

//消息同步操作
const messageSync = 0
const messageQueryAwareness = 3
const messageAwareness = 1
const messageAuth = 2

const reconnectTimeoutBase = 1200
const maxReconnectTimeout = 2500
// @todo - this should depend on awareness.outdatedTime
const messageReconnectTimeout = 30000

/**
 * @description 协议连接被拒绝的处理函数
 * @param {WebsocketProvider} provider
 * @param {string} reason
 */
const permissionDeniedHandler = (provider, reason) => console.warn(`Permission denied to access ${provider.url}.\n${reason}`)

/**
 * @description 读取收到消息
 * @param {WebsocketProvider} provider
 * @param {Uint8Array} buf 通信数据
 * @param {boolean} emitSynced 是否来自远程的消息
 * @return {encoding.Encoder}
 */
const readMessage = (provider, buf, emitSynced) => {
  //基于数据构建解码器
  const decoder = decoding.createDecoder(buf)
  //创建编码器
  const encoder = encoding.createEncoder()
  //获取消息类型(websocket层协议)
  const messageType = decoding.readVarUint(decoder)
  switch (messageType) {
    case messageSync: {//是消息同步操作
      //编码消息类型
      encoding.writeVarUint(encoder, messageSync)
      //获取消息类型(protocol层协议)
      /*
      * 该方法执行:
      * 1.是step1消息，接受到的数据是远程文档状态的向量，将本地文档状态与远程文档向量对比转化为更新数据作为step2消息的消息体
      * 2.是step2消息，接收到的是远程文档的更新信息，与本地文档进行同步*/
      const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, provider.doc, provider)
        //如果消息类型为step2类型，且来自远程，且消息已同步标识未设置为true则要把其设置为true，且尚未同步，则设置为已同步(因为上一行代码执行的就是同步操作)
      if (emitSynced && syncMessageType === syncProtocol.messageYjsSyncStep2 && !provider.synced) {
        provider.synced = true
      }
      break
    }
    case messageQueryAwareness:
      encoding.writeVarUint(encoder, messageAwareness)
      encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(provider.awareness, Array.from(provider.awareness.getStates().keys())))
      break
    case messageAwareness:
      awarenessProtocol.applyAwarenessUpdate(provider.awareness, decoding.readVarUint8Array(decoder), provider)
      break
    case messageAuth:
      authProtocol.readAuthMessage(decoder, provider.doc, permissionDeniedHandler)
      break
    default:
      console.error('Unable to compute message')
      return encoder
  }
  return encoder
}

/**
 * @description 初始化ws通信
 * @param {WebsocketProvider} provider
 */
const setupWS = provider => {
    //不允许连接或未提供websocket实例则不执行连接程序
  if (provider.shouldConnect && provider.ws === null) {
    const websocket = new provider._WS(provider.url)
    websocket.binaryType = 'arraybuffer'
    provider.ws = websocket
    provider.wsconnecting = true
    provider.wsconnected = false
    provider.synced = false

      //收到消息时
    websocket.onmessage = event => {
        //获取国际时间
      provider.wsLastMessageReceived = time.getUnixTime()
        //读取数据
      const encoder = readMessage(provider, new Uint8Array(event.data), true)
        //不发送脏数据
      if (encoding.length(encoder) > 1) {
        websocket.send(encoding.toUint8Array(encoder))
      }
    }
    websocket.onclose = () => {
      provider.ws = null
      provider.wsconnecting = false
      if (provider.wsconnected) {
        provider.wsconnected = false
        provider.synced = false
        // update awareness (all users except local left)
        // 更新意识信息
        awarenessProtocol.removeAwarenessStates(provider.awareness, Array.from(provider.awareness.getStates().keys()).filter(client => client !== provider.doc.clientID), provider)
        provider.emit('status', [{
          status: 'disconnected'
        }])
      } else {
        provider.wsUnsuccessfulReconnects++
      }
      // Start with no reconnect timeout and increase timeout by
      // log10(wsUnsuccessfulReconnects).
      // The idea is to increase reconnect timeout slowly and have no reconnect
      // timeout at the beginning (log(1) = 0)
      setTimeout(setupWS, math.min(math.log10(provider.wsUnsuccessfulReconnects + 1) * reconnectTimeoutBase, maxReconnectTimeout), provider)
    }
    websocket.onopen = () => {
      //记录最近接收的消息的时间
      provider.wsLastMessageReceived = time.getUnixTime()
      //连接成功，设置connecting为false
      provider.wsconnecting = false
      provider.wsconnected = true
      //清空重连失败的次数
      provider.wsUnsuccessfulReconnects = 0
      provider.emit('status', [{
        status: 'connected'
      }])
      // always send sync step 1 when connected
      // 连接成功时发送step1消息，将本地文档状态向量广播到其他客户端
      const encoder = encoding.createEncoder()
      encoding.writeVarUint(encoder, messageSync)
      syncProtocol.writeSyncStep1(encoder, provider.doc)
      websocket.send(encoding.toUint8Array(encoder))
      // broadcast local awareness state
      // 广播本地意识信息(通知他人我已经上线)
      if (provider.awareness.getLocalState() !== null) {
        const encoderAwarenessState = encoding.createEncoder()
        encoding.writeVarUint(encoderAwarenessState, messageAwareness)
        encoding.writeVarUint8Array(encoderAwarenessState, awarenessProtocol.encodeAwarenessUpdate(provider.awareness, [provider.doc.clientID]))
        websocket.send(encoding.toUint8Array(encoderAwarenessState))
      }
    }

    provider.emit('status', [{
      status: 'connecting'
    }])
  }
}

/**
 * @param {WebsocketProvider} provider
 * @param {ArrayBuffer} buf
 */
const broadcastMessage = (provider, buf) => {
  if (provider.wsconnected) {
    // @ts-ignore We know that wsconnected = true
    provider.ws.send(buf)//发送消息
  }
  if (provider.bcconnected) {
    provider.mux(() => {
      bc.publish(provider.bcChannel, buf)
    })
  }
}

/**
 * Websocket Provider for Yjs. Creates a websocket connection to sync the shared document.
 * The document name is attached to the provided url. I.e. the following example
 * creates a websocket connection to http://localhost:1234/my-document-name
 *
 * @example
 *   import * as Y from 'yjs'
 *   import { WebsocketProvider } from 'y-websocket'
 *   const doc = new Y.Doc()
 *   const provider = new WebsocketProvider('http://localhost:1234', 'my-document-name', doc)
 *
 * @extends {Observable<string>}
 */
export class WebsocketProvider extends Observable {
  /**
   * @param {string} serverUrl 服务地址
   * @param {string} roomname 房间名
   * @param {Y.Doc} doc 本地共享文档实例
   * @param {object} [opts]
   * @param {boolean} [opts.connect] 是否连接
   * @param {awarenessProtocol.Awareness} [opts.awareness] 意识信息
   * @param {Object<string,string>} [opts.params] 请求携带的参数
   * @param {typeof WebSocket} [opts.WebSocketPolyfill] Optionall provide a WebSocket polyfill 使用提供的websocket连接
   * @param {number} [opts.resyncInterval] Request server state every `resyncInterval` milliseconds 每隔resyncInterval秒请求服务区
   */
  constructor (serverUrl, roomname, doc, { connect = true, awareness = new awarenessProtocol.Awareness(doc), params = {}, WebSocketPolyfill = WebSocket, resyncInterval = -1 } = {}) {
    super()
    // ensure that url is always ends with / 确保服务器地址以/结尾
    while (serverUrl[serverUrl.length - 1] === '/') {
      serverUrl = serverUrl.slice(0, serverUrl.length - 1)
    }
    //将携带的参数转化为查询字符串
    const encodedParams = url.encodeQueryParams(params)
    this.bcChannel = serverUrl + '/' + roomname
      //拼接地址
    this.url = serverUrl + '/' + roomname + (encodedParams.length === 0 ? '' : '?' + encodedParams)
    this.roomname = roomname
    this.doc = doc
    this._WS = WebSocketPolyfill
    this.awareness = awareness
      //是否已连接
    this.wsconnected = false
      //是否连接中
    this.wsconnecting = false
      //
    this.bcconnected = false
      //重连次数
    this.wsUnsuccessfulReconnects = 0
      //创建互斥锁
    this.mux = mutex.createMutex()
    /**
     * @description 是否已同步
     * @type {boolean}
     */
    this._synced = false
    /**
     * @description websocket实例
     * @type {WebSocket?}
     */
    this.ws = null
      //最近收到的消息时间
    this.wsLastMessageReceived = 0
    /**
     * Whether to connect to other peers or not 是否连接到其他端点
     * @type {boolean}
     */
    this.shouldConnect = connect

    /**
     * @type {NodeJS.Timeout | number}
     */
    this._resyncInterval = 0
      //如果设置了定时请求
    if (resyncInterval > 0) {
      this._resyncInterval = setInterval(() => {
        if (this.ws) {
          // resend sync step 1
          const encoder = encoding.createEncoder()
          encoding.writeVarUint(encoder, messageSync)
          syncProtocol.writeSyncStep1(encoder, doc)
          this.ws.send(encoding.toUint8Array(encoder))
        }
      }, resyncInterval)
    }

    /**
     * @description 收到来自其他Tab页的消息时
     * @param {ArrayBuffer} data
     */
    this._bcSubscriber = data => {
      this.mux(() => {
        const encoder = readMessage(this, new Uint8Array(data), false)
        if (encoding.length(encoder) > 1) {
          bc.publish(this.bcChannel, encoding.toUint8Array(encoder))
        }
      })
    }
    /**
     * Listens to Yjs updates and sends them to remote peers (ws and broadcastchannel) 监听yjs共享文档的更新并同步数据到远程
     * @param {Uint8Array} update
     * @param {any} origin
     */
    this._updateHandler = (update, origin) => {
        //更新来源不是自身则编码发送该消息
      if (origin !== this || origin === null) {
          //创建编码器
        const encoder = encoding.createEncoder()
          //在编码器中写入消息类型
        encoding.writeVarUint(encoder, messageSync)
          //在编码器中写入消息数据
        syncProtocol.writeUpdate(encoder, update)
          //广播消息
        broadcastMessage(this, encoding.toUint8Array(encoder))
      }
    }
    this.doc.on('update', this._updateHandler)
    /**
     * @param {any} changed
     * @param {any} origin
     */
    this._awarenessUpdateHandler = ({ added, updated, removed }, origin) => {
      const changedClients = added.concat(updated).concat(removed)
      const encoder = encoding.createEncoder()
      encoding.writeVarUint(encoder, messageAwareness)
      encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(awareness, changedClients))
      broadcastMessage(this, encoding.toUint8Array(encoder))
    }
    window.addEventListener('beforeunload', () => {
      awarenessProtocol.removeAwarenessStates(this.awareness, [doc.clientID], 'window unload')
    })
    awareness.on('update', this._awarenessUpdateHandler)
    this._checkInterval = setInterval(() => {
      if (this.wsconnected && messageReconnectTimeout < time.getUnixTime() - this.wsLastMessageReceived) {
        // no message received in a long time - not even your own awareness
        // updates (which are updated every 15 seconds)
        /** @type {WebSocket} */ (this.ws).close()
      }
    }, messageReconnectTimeout / 10)
    if (connect) {
      this.connect()
    }
  }

  /**
   * @type {boolean}
   */
  get synced () {
    return this._synced
  }

  set synced (state) {
    if (this._synced !== state) {
      this._synced = state
      this.emit('synced', [state])
      this.emit('sync', [state])
    }
  }

  destroy () {
    if (this._resyncInterval !== 0) {
      clearInterval(/** @type {NodeJS.Timeout} */ (this._resyncInterval))
    }
    clearInterval(this._checkInterval)
    this.disconnect()
    this.awareness.off('update', this._awarenessUpdateHandler)
    this.doc.off('update', this._updateHandler)
    super.destroy()
  }

  //连接到远程
  connectBc () {
    if (!this.bcconnected) {
        //订阅当前房间号的事件
      bc.subscribe(this.bcChannel, this._bcSubscriber)
      this.bcconnected = true
    }
    // send sync step1 to bc 通过bc发送step1消息(这里用互斥锁保证了同一时刻只有一个同步程序在执行)
    this.mux(() => {
      // write sync step 1
        //创建编码器
      const encoderSync = encoding.createEncoder()
        //头部写入消息
      encoding.writeVarUint(encoderSync, messageSync)
        //构建Step1消息，将当前文档的状态向量写入消息中
      syncProtocol.writeSyncStep1(encoderSync, this.doc)
        //通知其他选项卡当前的状态向量（同步数据）
      bc.publish(this.bcChannel, encoding.toUint8Array(encoderSync))
      // broadcast local state  广播本地状态
      const encoderState = encoding.createEncoder()
      encoding.writeVarUint(encoderState, messageSync)
      //创建Step2消息，将当前文档编码为更新消息
      syncProtocol.writeSyncStep2(encoderState, this.doc)
      //广播到其他选项卡  
      bc.publish(this.bcChannel, encoding.toUint8Array(encoderState))
        
        
      //说实话我目前还没理解同时创建step1和step2的原因，因为不管是step1消息中的向量还是step2中的更新状态都可以用来完成数据同步。
        
      
      // write queryAwareness 写入意识信息
      const encoderAwarenessQuery = encoding.createEncoder()
      //这里广播了一个不附带消息体的messageQueryAwareness信息，我尚未理解其原因
      encoding.writeVarUint(encoderAwarenessQuery, messageQueryAwareness)
      bc.publish(this.bcChannel, encoding.toUint8Array(encoderAwarenessQuery))
      // broadcast local awareness state 广播本地的意识信息状态
      const encoderAwarenessState = encoding.createEncoder()
      encoding.writeVarUint(encoderAwarenessState, messageAwareness)
      encoding.writeVarUint8Array(encoderAwarenessState, awarenessProtocol.encodeAwarenessUpdate(this.awareness, [this.doc.clientID]))
      bc.publish(this.bcChannel, encoding.toUint8Array(encoderAwarenessState))
    })
  }

  disconnectBc () {
    // broadcast message with local awareness state set to null (indicating disconnect)
    // 广播将本地意识状态设置为null(其实就是通知别人我下线了)
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageAwareness)
    encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(this.awareness, [this.doc.clientID], new Map()))
    broadcastMessage(this, encoding.toUint8Array(encoder))
    if (this.bcconnected) {
      bc.unsubscribe(this.bcChannel, this._bcSubscriber)
      this.bcconnected = false
    }
  }

  disconnect () {
    this.shouldConnect = false
    this.disconnectBc()
    if (this.ws !== null) {
      this.ws.close()
    }
  }

  connect () {
    this.shouldConnect = true
    if (!this.wsconnected && this.ws === null) {
      setupWS(this)
      this.connectBc()
    }
  }
}

```


:::

上述源码代码过多同时涉及到yjs其他模块，我们梳理以下y-websocket的流程架构:

### 初始化对象

类似大多数ws通信初始化方式，我们通过`new WebsocketProvider`来创建ws连接，yjs称其实例化对象为provider，我们后面也称其为provider。
初始化参数我上面都有注释，大部分很好理解，我们这只单独说一下`WebSocketPolyfill`这个参数。[官网](https://github.com/yjs/y-websocket)对这个参数的解释是当在node环境下使用这个库时需要配置该参数。原因是浏览器环境下环境变量中有[Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)这个对象了可以直接调用，node全局环境下没有这个对象所以需要额外提供，这个参数本质上就是一个`Websocket`对象(类)。以下是官网的代码实例:

`const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc, { WebSocketPolyfill: require('ws') })`

当然你硬要在浏览器环境下传也可以，就像下面这样：
`const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc, { WebSocketPolyfill: Websocket })`

初始化过程中会初始化一些属性，这些没什么好说的。其中有个`this.mux = mutex.createMutex()`属性，是在对象实例上创建了一个互斥锁。这个方法确保了同一时刻只有一个mux函数在执行，如下是[官网](https://www.npmjs.com/package/lib0)的示例:
```js
const mutex = createMutex()
mutex(() => {
  // This function is immediately executed 该函数将会立即执行
  mutex(() => {
    // This function is not executed, as the mutex is already active. 这个函数将不会被执行，因为有正在执行的mutx函数
  })
})
```
上图示例中在mutex函数内部调用的mutex函数是不会执行的，因为执行内部函数时外层的函数没还没执行结束，相当于被锁住了。

### 初始化连接(connect)

初始化连接有两种方式，执行`new WebsocketProvider`时传递`connect`参数则会自动连接，否则需要手动调用`connect()`连接。

connect方法内部会首先调用setupWS方法构建websocket连接。
#### setupWS
* 给websocket实力绑定[活动事件](#活动事件)
* 设置provider状态为连接中

随后调用connectBc方法初始化本地跨标签页更新

#### connectBc
* 订阅当前房间号的事件，当其他标签页修改时会触发该事件，通过获取该事件的参数即可实现本地跨标签同步。
* 通过y-protocol协议同步文档信息，同步意识信息

### 关闭连接(disconnect)

* 设置shouldConnect为false
* 调用disconnectBC方法
* 关闭websocket连接

#### disconnectBc

* 通知其他人本机已离线
* 关闭标签页监听

### 活动事件

项目下的事件活动主要在这里处理。

#### 消息接受(onmessage)

* 记录消息的接收时间
* 将数据实例化，开始读取信息
    * 创建回复的消息(encoder)
    * 判断信息的类型，意识信息或文档同步信息在这里区分
    * 是文档同步信息。进入下层(y-protocol)协议
      * 判断信息类型(step1/step2)
      * step1消息。消息主体为远程文档的状态向量，将该状态向量与本地文档状态比较生成更新数据并封装成step2类型的消息(encoder)
      * step2消息。消息主体为当前文档和发送方文档的差异数据，将这些差异同步到本地文档以实现文档状态同步。
    * 是意识信息
      * ...
    * 是身份信息
      * ...
    * 发送回复消息(encoder)
* 回复消息数据为空则不发送数据，否则广播发送数据

#### 连接成功(onopen)

* 更新provider的状态为连接成功
* 创建step1消息，广播该消息到其他远程客户端
  * 连接成功后发送step1消息必要性？事实上在初始化一个WebsocketProvider的时候，我们会传入一个doc，这个doc是从服务器获取的最新的文档状态。我觉得连接成功后发送一次step1主要还是为了能获取到最新的文档状态，因为这个文档可能正有其他用户在编辑中(最新的版本)，编辑中的文档会产生一些尚未持久化的差异，这些差异并不会立即同步到数据库中，而初始化中获取的初始文档数据大概率是从数据库中读取的文件，我们需要一次同步操作来使新加入的用户能立即获取到未持久化的最新编辑中。
  * 广播意识信息，告诉其他用户我已上线

#### 连接关闭(onclose)

* 清除websocket实例
* 清除自身以外的意识信息


### Usages

#### status Event

WebsocketProvider对象继承自lib0库的[Observable类](https://www.npmjs.com/package/lib0)。这个类就是个订阅发布模式的实现，WebsocketProvider类内部触发status事件来暴露连接的状态。我们可以绑定响应的监听事件函数来处理连接状态的变化。

#### synced Getter

当该字段变化时，WebsocketProvider内部会触发`synced`和`sync`事件.同样可以绑定对应的监听函数来满足一些业务上的需求(比如，保存中？或者加载中？)
