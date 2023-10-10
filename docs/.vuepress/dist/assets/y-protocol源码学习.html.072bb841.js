import{_ as n,o as s,c as a,a as e}from"./app.544e4f17.js";const t={},p=e(`<h1 id="y-protocol" tabindex="-1"><a class="header-anchor" href="#y-protocol" aria-hidden="true">#</a> y-protocol</h1><p>\u4F5C\u4E3A\u4E00\u4E2A\u5206\u5E03\u5F0F\u6570\u636E\u540C\u6B65\u5E93\uFF0Cyjs\u8FD8\u662F\u8BBE\u8BA1\u4E86\u4E00\u4E9B\u4E0E\u81EA\u8EAB\u76F8\u9002\u8F83\u597D\u7684\u901A\u4FE1\u534F\u8BAE(y-protocol)\u7684\u3002\u8FD9\u91CC\u6211\u4EEC\u9010\u884C\u4EE3\u7801\u5206\u6790\u4E0B\u8BE5\u534F\u8BAE\u7684\u8BBE\u8BA1\u601D\u60F3\uFF0C\u9650\u4E8E\u82F1\u6587\u6C34\u5E73\u53EF\u80FD\u7FFB\u8BD1\u7684\u4E0D\u591F\u51C6\u786E\uFF0C\u53EF\u5BF9\u7167\u539F\u6587\u67E5\u770B\u3002</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u6E90\u7801</summary><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@module</span> sync-protocol
 */</span>

<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> encoding <span class="token keyword">from</span> <span class="token string">&#39;lib0/encoding.js&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> decoding <span class="token keyword">from</span> <span class="token string">&#39;lib0/decoding.js&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">Y</span> <span class="token keyword">from</span> <span class="token string">&#39;yjs&#39;</span>


<span class="token doc-comment comment">/**
 * \u5BFC\u5165\u7684lib0\u5305\u63D0\u4F9B\u4E86\u4E00\u4E9B\u5E38\u7528\u65B9\u6CD5\uFF0C\u7531\u4E8E\u6211\u6CA1\u7528\u8FC7\u6240\u4EE5\u6211\u4EEC\u8FD9\u91CC\u53EA\u5173\u6CE8\u4F7F\u7528\u5230\u7684\u65B9\u6CD5\u505A\u4E86\u4E9B\u4EC0\u4E48
 * encoding\uFF1A\u63D0\u4F9B\u4E8C\u8FDB\u5236\u7F16\u7801\u65B9\u6CD5
 * decoding\uFF1A\u63D0\u4F9B\u4E8C\u8FDB\u5236\u89E3\u7801\u65B9\u6CD5**/</span>


<span class="token doc-comment comment">/**
 * <span class="token keyword">@typedef</span> <span class="token class-name"><span class="token punctuation">{</span>Map<span class="token punctuation">&lt;</span>number<span class="token punctuation">,</span> number<span class="token punctuation">&gt;</span><span class="token punctuation">}</span></span> <span class="token class-name">StateMap</span>
 */</span>

<span class="token doc-comment comment">/**
 * * Core Yjs defines two message types:
 * \u2022 YjsSyncStep1: Includes the State Set of the sending client. When received, the client should reply with YjsSyncStep2.
 * \u2022 YjsSyncStep2: Includes all missing structs and the complete delete set. When received, the client is assured that it
 *   received all information from the remote client.
 *   
 * yjs\u4E3B\u8981\u7EA6\u5B9A\u4E86\u4E24\u4E2A\u6838\u5FC3\u6D88\u606F\u7C7B\u578B:
 * \u2022 YjsSyncStep1: \u6D88\u606F\u4E2D\u5305\u62EC\u4E86\u53D1\u9001\u65B9\u5BA2\u6237\u7AEF\u7684\u72B6\u6001\u96C6\u5408\u3002\u5F53\u63A5\u6536\u5230\u65F6\uFF0C\u5BA2\u6237\u7AEF\u5E94\u8BE5\u56DE\u590D YjsSyncStep2\u7C7B\u578B\u7684\u6D88\u606F\u3002
 * \u2022 YjsSyncStep2: \u8BE5\u6D88\u606F\u5305\u62EC\u4E86\u6240\u6709\u7F3A\u5931\u7684\u6570\u636E\u7ED3\u6784\u548C\u5B8C\u6574\u7684\u5220\u9664\u96C6\u5408\u3002\u5F53\u63A5\u6536\u5230\u65F6\uFF0C\u4EE3\u8868\u53D1\u9001\u65B9\u5BA2\u6237\u7AEF\u5DF2\u7ECF\u63A5\u6536\u5230\u4E86\u6765\u81EA\u8FDC\u7A0B\u5BA2\u6237\u7AEF\u7684\u6240\u6709\u4FE1\u606F\u3002
 *
 * 
 * In a peer-to-peer network, you may want to introduce a SyncDone message type. Both parties should initiate the connection
 * with SyncStep1. When a client received SyncStep2, it should reply with SyncDone. When the local client received both
 * SyncStep2 and SyncDone, it is assured that it is synced to the remote client.
 * \u9664\u4E86\u4E0A\u8FF0\u4E24\u79CD\u6D88\u606F\u7C7B\u578B\u5916\uFF0C\u5728\u70B9\u5BF9\u70B9\u7F51\u7EDC\u4E2D\uFF0C\u6211\u4EEC\u4E5F\u53EF\u4EE5\u989D\u5916\u5F15\u5165\u4E00\u4E2A\u540D\u4E3A &quot;SyncDone&quot; \u7684\u6D88\u606F\u7C7B\u578B\u3002\u53CC\u65B9\u4E2D\u6709\u4E00\u65B9\u60F3\u53D1\u8D77\u901A\u4FE1\u65F6\u5E94\u8BE5\u4F7F\u7528 &quot;SyncStep1&quot; \u5F00\u59CB\u8FDE\u63A5\u3002\u800C\u5F53\u4E00\u4E2A\u5BA2\u6237\u7AEF\u6536\u5230 &quot;SyncStep2&quot; \u65F6\uFF0C\u8868\u793A\u53D1\u9001\u7684\u6D88\u606F\u88AB\u6210\u529F\u63A5\u53D7\uFF0C\u8FD9\u65F6\u6211\u4EEC\u53EF\u4EE5\u56DE\u590D &quot;SyncDone&quot;\uFF0C\u8868\u793A\u672C\u6B21\u901A\u4FE1\u7ED3\u675F\u3002\u5F53\u672C\u5730\u5BA2\u6237\u7AEF\u540C\u65F6\u6536\u5230 &quot;SyncStep2&quot; \u548C &quot;SyncDone&quot; \u65F6\uFF0C\u53EF\u4EE5\u786E\u4FDD\u5B83\u5DF2\u7ECF\u4E0E\u8FDC\u7A0B\u5BA2\u6237\u7AEF\u540C\u6B65\u5B8C\u6210\u3002
 *
 * \u5728\u5BA2\u6237\u7AEF\u5BF9\u670D\u52A1\u5668\u7684\u6A21\u5F0F\u4E2D\uFF0C\u5904\u7406\u7684\u65B9\u5F0F\u4F1A\u6709\u4E00\u4E9B\u4E0D\u540C\uFF1A\u5BA2\u6237\u7AEF\u540C\u6837\u901A\u8FC7\u53D1\u9001YjsSyncStep1\u7C7B\u578B\u7684\u6D88\u606F\u6765\u53D1\u8D77\u4E00\u6B21\u901A\u4FE1\uFF0C\u5F53\u90FD\u670D\u52A1\u5668\u6536\u5230YjsSyncStep1\u6D88\u606F\u65F6\uFF0C\u670D\u52A1\u5668\u5E94\u8BE5\u7ACB\u5373\u56DE\u590DYjsSyncStep2\u7C7B\u578B\u7684\u6D88\u606F\uFF0C\u7136\u540E\u518D\u56DE\u590DSyncStep1\u6D88\u606F\u3002\u540C\u6837\u7684\u5F53\u5BA2\u6237\u7AEF\u6536\u5230SyncStep1\u4E5F\u662F\u5982\u6B64\u3002\u6211\u4EEC\u540C\u6837\u53EF\u4EE5\u989D\u5916\u5F15\u5165\u4E00\u4E2ASyncDone\u7C7B\u578B\u7684\u6D88\u606F\u6765\u8868\u793A\u901A\u4FE1\u7ED3\u675F\uFF0C
 * \u8FD9\u79CD\u901A\u4FE1\u65B9\u5F0F\u66F4\u4E3A\u590D\u6742\uFF0C\u53EF\u4EE5\u5E94\u7528\u4E8E\u4E0B\u9762\u4E24\u79CD\u60C5\u51B5\uFF1A
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
 * \u4E00\u4E2A\u6D88\u606F\u7684\u7ED3\u6784\u53EF\u80FD\u662F\u8FD9\u6837\u7684:[messageType : varUint, message definition..]
 * 
 * Note: A message does not include information about the room name. This must to be handled by the upper layer protocol!
 *
 * \u6CE8\u610F\u6D88\u606F\u4E2D\u4E0D\u8981\u5305\u542B\u623F\u95F4\u540D\u79F0\uFF0C\u8FD9\u79CD\u654F\u611F\u4FE1\u606F\u5E94\u8BE5\u4EA4\u7531\u4E0A\u5C42\u534F\u8BAE\u5904\u7406\u3002
 * 
 * stringify[messageType] stringifies a message definition (messageType is already read from the bufffer)
 */</span>

<span class="token comment">// \u5B9A\u4E49\u6D88\u606F\u7C7B\u578B</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> messageYjsSyncStep1 <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> messageYjsSyncStep2 <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">// yjs\u66F4\u65B0\u6D88\u606F</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> messageYjsUpdate <span class="token operator">=</span> <span class="token number">2</span>

<span class="token doc-comment comment">/**
 * Create a sync step 1 message based on the state of the current shared document.
 * \u6839\u636E\u5F53\u524D\u5171\u4EAB\u6587\u6863\u7684\u72B6\u6001\u521B\u5EFA\u6D88\u606F\u7C7B\u578B\u4E3AmessageYjsSyncStep1\u7684\u6D88\u606F
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>encoding<span class="token punctuation">.</span>Encoder<span class="token punctuation">}</span></span> <span class="token parameter">encoder</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Y<span class="token punctuation">.</span>Doc<span class="token punctuation">}</span></span> <span class="token parameter">doc</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">writeSyncStep1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">encoder<span class="token punctuation">,</span> doc</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/***
     *encoding.writeVarUint(encoder: module:encoding.Encoder, num: number) \u5199\u4E00\u4E2A\u53EF\u53D8\u957F\u5EA6\u7684\u65E0\u7B26\u53F7\u6574\u6570\u3002\u53EF\u7F16\u7801\u7684\u6700\u5927\u6574\u6570\u4E3A2^53\u3002
     *encoding.writeVarUint8Array(encoder: module:encoding.Encoder, uint8Array: Uint8Array) \u5C06\u4E00\u4E2AUint8Array\u9644\u52A0\u5230\u7F16\u7801\u4E2D\u3002*/</span>
    <span class="token comment">//\u5C06\u6D88\u606F\u7C7B\u578B\u7F16\u7801</span>
  encoding<span class="token punctuation">.</span><span class="token function">writeVarUint</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> messageYjsSyncStep1<span class="token punctuation">)</span>
    <span class="token comment">//\u83B7\u53D6\u5F53\u524D\u5171\u4EAB\u6587\u6863\u7684\u5411\u91CF(uint8array)</span>
  <span class="token keyword">const</span> sv <span class="token operator">=</span> <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token function">encodeStateVector</span><span class="token punctuation">(</span>doc<span class="token punctuation">)</span>
    <span class="token comment">//\u5199\u5165uint8array\u6570\u636E</span>
  encoding<span class="token punctuation">.</span><span class="token function">writeVarUint8Array</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> sv<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>encoding<span class="token punctuation">.</span>Encoder<span class="token punctuation">}</span></span> <span class="token parameter">encoder</span> \u7F16\u7801\u5668
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Y<span class="token punctuation">.</span>Doc<span class="token punctuation">}</span></span> <span class="token parameter">doc</span> \u5171\u4EAB\u6587\u6863
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Uint8Array<span class="token punctuation">}</span></span> <span class="token optional-parameter"><span class="token punctuation">[</span><span class="token parameter">encodedStateVector</span><span class="token punctuation">]</span></span> \u6587\u6863\u5411\u91CF
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">writeSyncStep2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">encoder<span class="token punctuation">,</span> doc<span class="token punctuation">,</span> encodedStateVector</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//\u6784\u5EFA\u56DE\u590D\u6D88\u606F</span>
  encoding<span class="token punctuation">.</span><span class="token function">writeVarUint</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> messageYjsSyncStep2<span class="token punctuation">)</span>
    <span class="token comment">//\u5C06step1\u4E2D\u63A5\u53D7\u5230\u7684\u6587\u6863\u5411\u91CF\u4F5C\u4E3A\u56DE\u590D\u6D88\u606F\u4F53</span>
    <span class="token comment">//\u6BD4\u8F83\u5F53\u524D\u6587\u6863\u548C\u8FDC\u7A0B\u6587\u6863\u7684\u5DEE\u5F02\u4F5C\u4E3A\u56DE\u590D\u6D88\u606F\u5185\u5BB9</span>
  encoding<span class="token punctuation">.</span><span class="token function">writeVarUint8Array</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token function">encodeStateAsUpdate</span><span class="token punctuation">(</span>doc<span class="token punctuation">,</span> encodedStateVector<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Read SyncStep1 message and reply with SyncStep2.
 *
 * \u8BFB\u53D6SyncStep1\u4FE1\u606F\u5E76\u56DE\u590DSyncStep2\u6D88\u606F
 * 
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>decoding<span class="token punctuation">.</span>Decoder<span class="token punctuation">}</span></span> <span class="token parameter">decoder</span> The reply to the received message \u5BF9\u6536\u5230\u6D88\u606F\u7684\u7B54\u590D
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>encoding<span class="token punctuation">.</span>Encoder<span class="token punctuation">}</span></span> <span class="token parameter">encoder</span> The received message \u6536\u5230\u7684\u6D88\u606F
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Y<span class="token punctuation">.</span>Doc<span class="token punctuation">}</span></span> <span class="token parameter">doc</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">readSyncStep1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">decoder<span class="token punctuation">,</span> encoder<span class="token punctuation">,</span> doc</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    <span class="token doc-comment comment">/**
     *decoding.readVarUint8Array(decoder: module:decoding.Decoder): Uint8Array \u8BFB\u53D6Uint8Array\u6570\u636E */</span>
    <span class="token comment">//\u7F16\u7801\u56DE\u590D\u6D88\u606F</span>
  <span class="token function">writeSyncStep2</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> doc<span class="token punctuation">,</span> decoding<span class="token punctuation">.</span><span class="token function">readVarUint8Array</span><span class="token punctuation">(</span>decoder<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * \u8BFB\u53D6\u5E76\u5E94\u7528\u7ED3\u6784\uFF0C\u7136\u540E\u4ECEy\u5B9E\u4F8B\u4E2D\u5220\u9664Store\u3002
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>decoding<span class="token punctuation">.</span>Decoder<span class="token punctuation">}</span></span> <span class="token parameter">decoder</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Y<span class="token punctuation">.</span>Doc<span class="token punctuation">}</span></span> <span class="token parameter">doc</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">transactionOrigin</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">readSyncStep2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">decoder<span class="token punctuation">,</span> doc<span class="token punctuation">,</span> transactionOrigin</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//\u8BFB\u53D6\u6570\u636E\u5E76\u5E94\u7528\u66F4\u6539</span>
  <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token function">applyUpdate</span><span class="token punctuation">(</span>doc<span class="token punctuation">,</span> decoding<span class="token punctuation">.</span><span class="token function">readVarUint8Array</span><span class="token punctuation">(</span>decoder<span class="token punctuation">)</span><span class="token punctuation">,</span> transactionOrigin<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> \u5199\u5165\u66F4\u65B0\u6D88\u606F
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>encoding<span class="token punctuation">.</span>Encoder<span class="token punctuation">}</span></span> <span class="token parameter">encoder</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Uint8Array<span class="token punctuation">}</span></span> <span class="token parameter">update</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">writeUpdate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">encoder<span class="token punctuation">,</span> update</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  encoding<span class="token punctuation">.</span><span class="token function">writeVarUint</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> messageYjsUpdate<span class="token punctuation">)</span>
  encoding<span class="token punctuation">.</span><span class="token function">writeVarUint8Array</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> update<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>decoding<span class="token punctuation">.</span>Decoder<span class="token punctuation">}</span></span> <span class="token parameter">decoder</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Y<span class="token punctuation">.</span>Doc<span class="token punctuation">}</span></span> <span class="token parameter">doc</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">transactionOrigin</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> readUpdate <span class="token operator">=</span> readSyncStep2

<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>decoding<span class="token punctuation">.</span>Decoder<span class="token punctuation">}</span></span> <span class="token parameter">decoder</span> A message received from another client \u9700\u8981\u89E3\u7801\u7684\u6D88\u606F\uFF0C\u6765\u81EA\u5176\u4ED6\u5BA2\u6237\u7AEF\u6216\u670D\u52A1\u5668
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>encoding<span class="token punctuation">.</span>Encoder<span class="token punctuation">}</span></span> <span class="token parameter">encoder</span> The reply message. Will not be sent if empty.\u9700\u8981\u53D1\u9001\u7684\u6D88\u606F\uFF0C\u6D88\u606F\u4E3A\u7A7A\u5C06\u4E0D\u4F1A\u88AB\u53D1\u9001
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Y<span class="token punctuation">.</span>Doc<span class="token punctuation">}</span></span> <span class="token parameter">doc</span> \u672C\u5730\u7684doc
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">transactionOrigin</span> \u672C\u5730\u7684provider
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">readSyncMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">decoder<span class="token punctuation">,</span> encoder<span class="token punctuation">,</span> doc<span class="token punctuation">,</span> transactionOrigin</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">//\u83B7\u53D6y-protocol\u5C42\u7684\u6D88\u606F\u7C7B\u578B</span>
  <span class="token keyword">const</span> messageType <span class="token operator">=</span> decoding<span class="token punctuation">.</span><span class="token function">readVarUint</span><span class="token punctuation">(</span>decoder<span class="token punctuation">)</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>messageType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">messageYjsSyncStep1</span><span class="token operator">:</span>
        <span class="token comment">//\u8BE5\u6D88\u606F\u7C7B\u578B\u4E3Astep1</span>
      <span class="token function">readSyncStep1</span><span class="token punctuation">(</span>decoder<span class="token punctuation">,</span> encoder<span class="token punctuation">,</span> doc<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">messageYjsSyncStep2</span><span class="token operator">:</span>
        <span class="token comment">//\u8BE5\u6D88\u606F\u7C7B\u578B\u4E3Astep2</span>
      <span class="token function">readSyncStep2</span><span class="token punctuation">(</span>decoder<span class="token punctuation">,</span> doc<span class="token punctuation">,</span> transactionOrigin<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">messageYjsUpdate</span><span class="token operator">:</span>
      <span class="token function">readUpdate</span><span class="token punctuation">(</span>decoder<span class="token punctuation">,</span> doc<span class="token punctuation">,</span> transactionOrigin<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;Unknown message type&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> messageType
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,3),c=[p];function o(i,l){return s(),a("div",null,c)}var d=n(t,[["render",o],["__file","y-protocol\u6E90\u7801\u5B66\u4E60.html.vue"]]);export{d as default};
