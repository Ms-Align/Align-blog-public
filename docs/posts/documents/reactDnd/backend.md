---
icon: repo
article: Align
title: backend
date: 2023-08-29
category:
  - react-dnd
tag:
  - react-dnd
---

## HTML5

底层使用HTML5提供的Drag/Drop API，并在内部对不同浏览器的差异做了兼容处理。

`npm install react-dnd-html5-backend`

## 附加功能

除了直接导出作为backend外，该包还提供了一些其他的功能:

* **getEmptyImage()** 一个返回透明空白图像的函数。使用 DragSourceConnector 的 connect.dragPreview() 来完全隐藏浏览器绘制的拖动预览。适用于使用 DragLayer 绘制自定义拖动图层。请注意，自定义拖动预览在 IE 浏览器中不起作用。
* **NativeTypes**一个包含三个拖放类型的枚举，分别是 NativeTypes.FILE、NativeTypes.URL 和 NativeTypes.TEXT。您可以为这些类型注册放置目标，以处理本地文件、URL 或常规页面文本的拖放。

## 用法

```js
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function MyReactApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      /* your drag-and-drop application */
    </DndProvider>
  )
}
```
当你调用监视的`getItem()`方法时，HTML5 backend会根据拖放类型从事件中提取出各种数据:
* NativeTypes.FILE
  * `getItem().files` 被拖拽的返回文件数组
  * `getItem().items` 返回的是和`event.dataTransfer.items`类似的对象(当上传的是文件夹时，通过该对象可以获得文件列表)
* NativeTypes.URL
  * `getItem().urls` 被拖拽的链接的数组
* NativeTypes.TEXT
  * `getItem().text` 被拖拽的文本
