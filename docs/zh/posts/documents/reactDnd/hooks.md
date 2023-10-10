---
icon: repo
article: Align
title: hooks
date: 2023-08-29
category:
  - react-dnd
tag:
  - react-dnd
---

## 概览

react-dnd提供了三个主要的钩子用于将react-dnd和你的组件关联起来。第四个钩子用于测试和开发。

* `useDrag`
* `useDrop`
* `useDragLayer`
* `useDragDropManager`(dev/test hook)

### 基础示例

一个可拖拽的盒子的代码可能会是下面这样：

```js
import { useDrag } from 'react-dnd'

function Box() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type"是必须的字段。指定了type后只有相同type的放置目标会响应该拖放事件
    type: 'BOX',
		// collect函数接受monitor示例，通过该实例可以从react-dnd系统中获取拖拽信息
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    //  dragPreview是可选的，绑定该属性后拖拽时绑定的元素会被添加到拖拽源上
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
        // 绑定拖动源
        <div role="Handle" ref={drag} />
    </div>
  )
}
```
现在我们有了可以拖拽的盒子，现在让我们创建一个可以接收盒子的容器：

```js
function Bucket() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // 指定接收的类型，和拖拽源的type对应。这个值可以是string或者symbol，但必须唯一。
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'white' }}
    >
      {canDrop ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}
```

上面介绍了两个常用钩子的基本用法，下面我们详细看下四个钩子函数。

## useDrag

useDraghook 提供了一种将组件作为拖动源连接到 DnD 系统的方法。通过将规范对象传递给 useDrag，您可以声明性地描述正在生成的可拖动对象的类型(type)、表示拖动源的对象(drag/dragPreview)、以及通过函数返回要收集的 props 等等。

```js
import { useDrag } from 'react-dnd'

function DraggableComponent(props) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type,
    item: { id }
  }))
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected}>
      ...
    </div>
  )
}

```

#### 参数
* **spec** 一个规范对象或者是返回规范对象的函数。
* **deps** 依赖更新数组。行为类似于`useMemo`，默认是一个空数组。

#### 返回值成员

* **[0] - Collected Props** 从collect函数中返回的对象，没有返回则为空对象。
* **[1] - DragSource Ref** 拖动源的引用。必须通过ref绑定到需要拖动的组件上。
* **[2] - DragPreview Ref** 拖动预览的引用。必须通过ref绑定到拖拽源被拖拽时需要显示的组件上。

### 规范对象的成员(Specification Object Members)

* **type** 必须。 规范对象的类型，必须为字符串或者symbol。
* **item** 必须。值可以为对象或者函数。 
  * 当值为javascript对象时，它描述了正在被拖动的数据的相关信息。同时这个对象也是放置目标(drop target)能从拖拽源(drag source)获得的唯一数据,这意味这通过该对象可以实现二者间从拖拽源到放置源的单向数据通信。不过官方建议尽量避免在这个对象中定义一些引用值类型例如对象，
这样会将拖动源和放置目标耦合起来。
  * 如果是一个函数，该函数会在拖动操作开始时触发，如果返回的值是null则会停止拖拽操作。
* **previewOptions** 可选。用来描述预览对象的javascript对象。
* **options** 可选。一个包含了下列配置项的对象：
  * dropEffect 可选。拖拽元素放置后的效果。可以是`copy`或`move`当前被拖拽的元素。
* **end(item, monitor)** 可选。当拖拽操作停止时会调用该函数。`start`函数应该和`end`函数一一对应。你可以通过调用`monitor.didDrop()`来判断当前放置是否被正确的放置目标所处理。如果该放置操作被处理，并且放置目标通过其`drop`方法返回了一个对象，那么就可以通过`monitor.getDropResult()`方法获取到放置目标返回的信息。`end`方法是一个触发Flux操作的好地方，注意如果组件在拖放过程中被卸载(unmounted),那么`component`参数的值将会是`null`。
* **canDrag(monitor)** 可选。用来设置当前拖动是否被允许。如果没有需要禁用的情况忽略此配置即可。请注意不能在这个方法中调用`monitor.canDrag()`。
* **isDragging(monitor)** 可选。默认情况下，只有发起拖动操作的拖动源才会被认为正在拖动。你可以通过定义该方法来覆盖默认的行为。注意请不要在该方法内部调用`monitor.isDragging()`
* **collect** 可选。它应该返回一个普通的 props 对象，以返回注入到您的组件中。 它接收两个参数，monitor和props


## useDrop

这个方法和useDrag对应。useDrag用来定义拖拽组件，useDrop用来定义放置组件。

```js
import { useDrop } from 'react-dnd'

function myDropTarget(props) {
  const [collectedProps, drop] = useDrop(() => ({
    accept
  }))

  return <div ref={drop}>Drop Target</div>
}
```

#### 参数

* **spec** 一个规范对象或者是返回规范对象的函数。
* **deps** 依赖更新数组。行为类似于`useMemo`，默认是一个空数组。

#### 返回值成员

* **[0] - Collected Props** 从collect函数中返回的对象，没有返回则为空对象。
* **[1] - DropSource Ref** 放置目标的引用。必须通过ref绑定到作为放置目标的组件上。

### 规范对象的成员(Specification Object Members)

* **accept** 必选。值为字符串或symbol，也可以是二者的数组。该放置目标只会对该字段指定类型的拖拽源有反应。
* **options** 可选。值为javascript对象。如果传递给组件的某些props不时原始值或者函数的话，你可以通过在该对象中定义一个`arePropsEqual(props, otherProps)`函数来优化性能，不过除非你遇到了性能问题，一般情况下不必关注该性能优化。
* **drop(item, monitor)** 可选。当拖拽源被放置到该目标上时调用。返回值可以是`undefined`或者对象，如果是对象则拖拽源可以在`drop`方法中通过`monitor.getDropResult()`方式获取到。如果放置目标存在嵌套则可以通过`monitor.didDrop()`或`monitor.getDropResult()`来判断当前放置是否被对应目标处理。注意当`canDrop`方法被调用且返回值为false时，该方法将不会被调用。
* **hover(item, monitor)** 可选。当拖动悬停在当前对象上时调用此函数。放置区存在嵌套情况时你可以通过`monitor.isOver({ shallow: true })`方法来判悬停是发生在当前元素上还是在嵌套的元素上。与`drop()`不同的是，哪怕拖动源定义了`canDrop`且返回值为false，该方法仍会被调用。
* **canDrop(item, monitor)** 可选。用来设置当前放置目标是否允许放置。如果没有需要禁用的情况忽略此配置即可。请注意不能在这个方法中调用`monitor.canDrop()`。
* **collect** 可选。**collect** 可选。它应该返回一个普通的 props 对象，以返回注入到您的组件中。 它接收两个参数，monitor和props。

## useDragLayer

该方法用来定义一个拖拽层。

```js
import { useDragLayer } from 'react-dnd'

function DragLayerComponent(props) {
  const collectedProps = useDragLayer(
    monitor =>{} /* Collected Props */
  )
  return <div>...</div>
}
```
#### 参数
* **collect** 可选。它应该返回一个普通的 props 对象，以返回注入到您的组件中。 它接收两个参数，monitor和props

#### 返回值

返回值就是从`collect`方法中返回的对象。

## useDragDropManager

该方法用来创建一个实例，可以通过该实例访问react-dnd的内部属性。

```js
import { useDragDropManager } from 'react-dnd'

function Example() {
  // The manager provides access to all of React DnD's internals
  const dragDropManager = useDragDropManager()

  return <div>Example</div>
}
```
