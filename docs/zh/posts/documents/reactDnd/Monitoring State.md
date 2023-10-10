---
icon: repo
article: Align
title: Monitoring State.md
date: 2023-08-29
category:
  - react-dnd
tag:
  - react-dnd
---

## DragSourceMonitor

DragSourceMonitor是一个传递给拖动源收集函数(`collect`)的对象。 它的方法允许您获取有关特定拖动源的拖动状态的信息。

### 方法

* **canDrag()** 如果没有拖动操作正在进行且拖动源定义的`canDrag`函数返回值为`true`或未定义`canDrag`函数，则该方法的返回值为`true`。
* **isDragging()** 如果有拖动操作正在进行且是当前monitor所在拖动源本身(不是嵌套)被拖动，或者定义的`isDragging`方法返回为`true`，则该方法返回值为`true`。
* **getItemType()** 返回当前被拖动元素的类型。如果当前没有元素被拖动则返回为`null`。
* **getItem()** 返回表示当前被拖动元素的对象。该对象必须在拖动源的`beginDrag()`方法中定义并返回，如果没有文件被拖动则返回值为`null`。
* **getDropResult()** 返回值为放置目标在`drop()`方法中返回的对象。存在嵌套关系时，遵从自下而上的顺序，任何明确从其 `drop()` 返回自身结果的父级都会覆盖先前由子级设置的子级 `drop` 结果。注意当该方法在`endDrag()`方法外部调用时返回值为`null`。
* **didDrop()** 只要当前放置事件被某个放置目标处理时返回`true`，哪怕放置目标没有返回任何drop result。常见用法是在`endDrag()`内部调用判断是否有放置目标处理了当前拖拽操作。该方法在`endDrag()`外部调用时返回`false`。
* **getInitialClientOffset()** 返回当前拖动操作开始时指针的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getInitialSourceClientOffset()** 在当前拖动操作开始时，返回拖动源组件的根 DOM 节点的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getClientOffset()** 返回正在进行拖动操作时，指针的最后记录的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getDifferenceFromInitialOffset()** 返回指针最后记录的客户端偏移量与当前拖动操作开始时的客户端偏移量之间的 { x, y } 差异。如果没有正在拖动的项目，则返回 null。
* **getSourceClientOffset()** 基于当前拖动操作开始时的位置和移动差异，返回拖动源组件根 DOM 节点的预测 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。


## DropTargetMonitor

DragSourceMonitor是一个传递给放置目标收集函数(`collect`)的对象。 它的方法允许您获取有关特定放置目标的状态信息。

### 方法

* **canDrop** 如果有拖动操作正在进行且放置目标定义的`canDrop`函数返回值为`true`或未定义`canDrop`函数，则该方法的返回值为`true`。
* **isOver(options)** 判断当前拖动是否悬停在当前放置目标上，当放置区存在嵌套的情况时，通过传递`{shallow: true }`参数来判断是否悬停是在当前目标上方而不是嵌套的目标上。
* **getItemType()** 返回当前被拖动元素的类型。如果当前没有元素被拖动则返回为`null`。
* **getItem()** 返回表示当前被拖动元素的对象。该对象必须在拖动源的`beginDrag()`方法中定义并返回，如果没有文件被拖动则返回值为`null`。
* **getDropResult()** 返回值为放置目标在`drop()`方法中返回的对象。存在嵌套关系时，遵从自下而上的顺序，任何明确从其 `drop()` 返回自身结果的父级都会覆盖先前由子级设置的子级 `drop` 结果。注意当该方法在`endDrag()`方法外部调用时返回值为`null`。
* **didDrop()** 只要当前放置事件被某个放置目标处理时返回`true`，哪怕放置目标没有返回任何drop result。常见用法是在`endDrag()`内部调用判断是否有放置目标处理了当前拖拽操作。该方法在`endDrag()`外部调用时返回`false`。
* **getInitialClientOffset()** 返回当前拖动操作开始时指针的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getInitialSourceClientOffset()** 在当前拖动操作开始时，返回拖动源组件的根 DOM 节点的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getClientOffset()** 返回正在进行拖动操作时，指针的最后记录的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getDifferenceFromInitialOffset()** 返回指针最后记录的客户端偏移量与当前拖动操作开始时的客户端偏移量之间的 { x, y } 差异。如果没有正在拖动的项目，则返回 null。
* **getSourceClientOffset()** 基于当前拖动操作开始时的位置和移动差异，返回拖动源组件根 DOM 节点的预测 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。


## DragLayerMonitor

DragLayerMonitor是传递给拖动层收集函数的对象。它的方法可让您获取有关全局拖动状态的信息

### 方法

* **isDragging()** 如果有拖动操作正在进行则该方法返回值为`true`,其他情况返回为`false`。
* **getItemType()** 返回当前被拖动元素的类型。如果当前没有元素被拖动则返回为`null`。
* **getItem()** 返回表示当前被拖动元素的对象。该对象必须在拖动源的`beginDrag()`方法中定义并返回，如果没有文件被拖动则返回值为`null`。
* **getDropResult()** 返回值为放置目标在`drop()`方法中返回的对象。存在嵌套关系时，遵从自下而上的顺序，任何明确从其 `drop()` 返回自身结果的父级都会覆盖先前由子级设置的子级 `drop` 结果。注意当该方法在`endDrag()`方法外部调用时返回值为`null`。
* **didDrop()** 只要当前放置事件被某个放置目标处理时返回`true`，哪怕放置目标没有返回任何drop result。常见用法是在`endDrag()`内部调用判断是否有放置目标处理了当前拖拽操作。该方法在`endDrag()`外部调用时返回`false`。
* **getInitialClientOffset()** 返回当前拖动操作开始时指针的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getInitialSourceClientOffset()** 在当前拖动操作开始时，返回拖动源组件的根 DOM 节点的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getClientOffset()** 返回正在进行拖动操作时，指针的最后记录的 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。
* **getDifferenceFromInitialOffset()** 返回指针最后记录的客户端偏移量与当前拖动操作开始时的客户端偏移量之间的 { x, y } 差异。如果没有正在拖动的项目，则返回 null。
* **getSourceClientOffset()** 基于当前拖动操作开始时的位置和移动差异，返回拖动源组件根 DOM 节点的预测 { x, y } 客户端偏移量。如果没有正在拖动的项目，则返回 null。



