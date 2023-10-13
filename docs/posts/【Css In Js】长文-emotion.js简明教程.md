---
layout: Post
title: 【Css In Js】长文-emotion.js简明教程
subtitle: 基于emotion官网文档的翻译
author: Align
date: 2023-10-13
headerImage: /img/in-post/2021-12-24/header.jpg
tags:
  - 前端
  - emotion
  - Css In Js
---

加入了一些自己的理解

<!-- more -->


## 起步

### 介绍

Emotion is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities.Both string and object styles are supported.

Emotion 是一个专为使用 JavaScript 编写 css (Css In Js)样式而设计的库。除了源映射、标签和测试实用程序等功能的出色开发人员体验之外，它还提供强大且可预测的样式组合。支持字符串和对象样式。

There are two primary methods of using Emotion. The first is *framework agnostic* and the second is for use with React.

emotion(下称emo)提供了两个库，一个没有框架限制，一个需要在React中使用。

#### 通用版本(Framework Agnostic)

`npm i @emotion/css`

The @emotion/css package is *framework agnostic* and the simplest way to use Emotion.

该包没有使用框架的限制，提供了使用Emotion最简单的方式。

* Requires no additional setup, babel plugin, or other config changes.不需要额外的设置、babel 插件或其他配置更改。
* Has support for auto vendor-prefixing, nested selectors, and media queries.支持自动添加前缀、嵌套选择和媒体查询。
* You simply prefer to use the css function to generate class names and cx to compose them.你只需使用提供的`css`方法生成类名和`cx`并组合它们。
* Server side rendering requires additional work to set up.服务器端渲染需要额外的工作来设置。

下面是一个简单的使用示例,展示了`css`方法的最常用功能:
```js
import { css } from '@emotion/css'

const color = 'white'

render(
  <div
    className={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```

#### React版本

`npm i @emotion/react`

The @emotion/react package requires React and is recommended for users of that framework if possible.

使用该包需要在React项目中，并且在React项目中也更推荐使用该版本的Emotion

* Best when using React with a build environment that can be configured.最好将 React 与可配置的构建环境一起使用。
* `css` prop support: css属性支持:
  * Similar to the style prop, but also has support for auto vendor-prefixing, nested selectors, and media queries.该属性与React支持的style类型类似，但是更像是style属性的一个超集，和上面提到的css方法一样支持自动前缀，css选择器和媒体查询。
  * Allows developers to skip the styled API abstraction and style components and elements directly.允许开发人员跳过样式化 API 抽象并直接样式化组件和元素。
  * The `css` prop also accepts a function that is called with your theme as an argument allowing developers easy access to common and customizable values.css 属性还接受一个以您的主题作为参数调用的函数，使开发人员可以轻松访问常见和可自定义的值。
  * Reduces boilerplate when composing components and styled with emotion.减少样板代码，例如styled API
* Server side rendering with zero configuration. 服务端渲染无需任何额外配置
* Theming works out of the box. 主题开箱即用
* ESLint plugins available to ensure proper patterns and configuration are set.提供了对应的eslint插件。

以下是一个示例展示了该库的使用:
```js
import { css } from '@emotion/react'

const color = 'white'

render(
  <div
    css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
// 其实就是css函数可以作为react元素prop直接设置了，不再需要类似const classname = css({-- your css --}) 这样的样板代码
```

`npm i @emotion/styled @emotion/react`

The @emotion/styled package is for those who prefer to use the styled.div style API for creating components.

@emotion/styled适合那些偏好使用styled.div风格创建组件的人使用。

下例展示了该库的基本使用方法:

```js
import styled from '@emotion/styled'

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

render(<Button>This my button component.</Button>)
```

#### 浏览器要求(Browser requirements)

Emotion supports all popular browsers and Internet Explorer 11.



## 安装

There are lots of ways to use Emotion, if you're using React, the easiest way to get started is to use the @emotion/react package. If you're not using React, you should use the @emotion/css package.

使用emo的方式有很多，如果你使用react，更推荐使用react版本，否则请使用通用的css版本。

`npm install --save @emotion/react`

To use it, import what you need, for example use the css prop to create class names with styles.

通过import导入你需要使用的Api，例如css

```js
import { css } from '@emotion/react'

const style = css`
  color: hotpink;
`

const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
)

const anotherStyle = css({
  textDecoration: 'underline'
})

const AnotherComponent = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
)
render(
  <SomeComponent>
    <AnotherComponent />
  </SomeComponent>
)
```

### 配合styled包使用(With styled)

styled is a way to create React components that have styles attached to them.

通过该API可以创建自定义样式的组件。

```shell
# assuming you already have @emotion/react installed
npm install --save @emotion/styled
```

```js
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`

render(<Button>This is a hotpink button.</Button>)
```

### 配合对应插件使用(With @emotion/babel-plugin)

::: warning

If you're using Create React App, you can use the Babel macro
如果你使用了Create React App创建的React应用，请使用包。

:::

Emotion has an optional Babel plugin that optimizes styles by compressing and hoisting them and creates a better developer experience with source maps and labels.

emo提供一个Babel插件，可以通过压缩和提升样式来优化样式，并通过源映射和标签创建更好的开发人员体验。

*"之前使用的时候就在想React组件上css写法是怎么实现的，现在看来确实是对应babel插件提前编译了"*

```shell
npm install --save-dev @emotion/babel-plugin
```

### .babelrc

"emotion" must be the first plugin in your babel config plugins list.

emo必须是babel插件列表中的第一个插件

```shell
{
  "plugins": ["@emotion"]
}
```

If you are using Babel's env option emotion must also be first for each environment.

如果你使用了 Babel 的 env 选项，emo也必须是每个环境的第一位。

```shell
{
  "env": {
    "production": {
      "plugins": ["@emotion", ...otherBabelPlugins]
    }
  },
  "plugins": ["@emotion"]
}
```

### Vanilla

If you're not using React, you can use vanilla Emotion from the @emotion/css package. Most of the documentation here focuses on the React-specific version of Emotion, but most of the concepts in the React-specific version also apply to vanilla Emotion.

如果你不是在react项目中使用，你可以直接使用css版本的包。虽然本文档讨论的大部分场景都是在使用在react项目中的react包，但是这些概念大部分在其他项目中也是可用的。

```shell
yarn add @emotion/css
```

以下示例展示了在原生js项目中使用emo

```js
import { css } from '@emotion/css'

const app = document.getElementById('root')
const myClassName = css`
  color: hotpink;
`
app.classList.add(myClassName)
```


## css属性(The css Prop)

The primary way to style elements with emotion is the css prop. It provides a concise and flexible API to style your components.

css属性是使用emo最简单便捷的方式。

### 开始

There are 2 ways to get started with the `css` prop.

有两种方式来使用css属性

* Babel Preset
* JSX Pragma

Both methods result in the same compiled code. After adding the preset or setting the pragma as a comment, compiled jsx code will use emotion's jsx function instead of React.createElement.

这两种方式会生成相同的编译代码。添加babel preset或在文件中设置pragma注释后，babel编辑react组件将会使用emo的jsx函数而不是react自己的React.createElement函数

|   |  *Input*|                     *Output*                      |
|:-:|:-:|:-------------------------------------------------:|
|Before|`<img src="avatar.png" />`|`React.createElement('img', { src: 'avatar.png' })`|
|After|`<img src="avatar.png" />	`|        `jsx('img', { src: 'avatar.png' })`        |

#### Babel Preset

This method will not work with Create React App or other projects that do not allow custom Babel configurations. Use the JSX Pragma method instead.

该方法不适用create React App创建或其他不支持常规Babel配置的项目，请用JSX Pragma方式替代。

**.babelrc**

```shell
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```
If you are using the compatible React version (>=16.14.0) then you can opt into using the new JSX runtimes by using such configuration:

如果你使用建勇版本的react(版本大于等于16.14.0)，你可以通过修改以下配置来使用新的react runtime

**.babelrc**

```shell
{
  "presets": [
    [
      "@babel/preset-react",
      { "runtime": "automatic", "importSource": "@emotion/react" }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

In case you want to use the new JSX runtimes with Next.js and you are using their next/babel preset then the configuration should look like this:

如果您想将新的 JSX 运行时与 Next.js 一起使用，并且您正在使用其 next/babel 预设，那么配置应如下所示：

**.babelrc**

```shell
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

#### JSX Pragma

Set the jsx pragma at the top of your source file that uses the css prop. This option works best for testing out the css prop feature or in projects where the babel configuration is not configurable (create-react-app, codesandbox, etc.).

想要支持css属性需要在文件顶部设置该注释.这种方式适合在项目中测试css属性的可用性或者不支持babel配置的项目中。


`/** @jsx jsx */`

Similar to a comment containing linter configuration, this configures the jsx babel plugin to use the jsx function instead of React.createElement.

和上面在babel中配置的效果相同，这将迫使babel使用emo的jsx方法来处理react组件。

If you are using a zero-config tool with automatic detection of which runtime (classic vs. automatic) should be used and you are already using a React version that has the new JSX runtimes (hence runtime: 'automatic' being configured automatically for you) such as Create React App 4 then /** @jsx jsx */ pragma might not work and you should use /** @jsxImportSource @emotion/react */ instead.

#### Import the jsx function from @emotion/react

```js

/** @jsx jsx */
import { jsx } from '@emotion/react'

```

Note that excluding this will cause your css to render as [Object Object].

请注意正确导入jsx函数，否则你的css将被渲染为[Object Object]

#### Use the css prop

Any component or element that accepts a className prop can also use the css prop. The styles supplied to the css prop are evaluated and the computed class name is applied to the className prop.

任何接受 className 属性的组件或元素也可以使用 css 属性。emo将评估提供给 css 属性的样式，并将计算出的类名应用于该组件的className属性。

### 对象风格(Object Styles)

The css prop accepts object styles directly and does not require an additional import.
css属性支持对象的形式。

```js
render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

### 字符串风格(String Styles)

To pass string styles, you must use css which is exported by @emotion/react, it can be used as a tagged template literal like below.

要传递字符串样式，您必须使用 @emotion/react 导出的 css，它可以用作标记模板文字，如下所示。

```js
import { css } from '@emotion/react'

const color = 'darkgreen'

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

*“说实话个人对于这种写法很难接受”*

::: info
css from @emotion/react does not return the computed class name string. The function returns an object containing the computed name and flattened styles. The returned object is understood by emotion at a low level and can be composed with other emotion based styles inside of the css prop, other css calls, or the styled API.

请注意从react版本的emo中导出的css方法并不会返回一个对象字符串，该函数返回一个包含计算名称和扁平化样式的对象。
返回的对象可以被低级别的emo所理解，并且可以与 css属性内的其他基于emo的样式、其他 css 调用或styled API 组合。

:::

You can also pass in your css as variables, which allows for composition (read more about this here).

您还可以将 css 作为变量传递，这样就可以进行组合（在此处阅读有关此内容的更多信息）。

### 优先级(Style Precedence)

* Class names containing emotion styles from the `className` prop override `css` prop styles.
  * 类名中
* Class names from sources other than emotion are ignored and appended to the computed emotion class name.

The precedence order may seem counter-intuitive, but it allows components with styles defined on the css prop to be customized via the className prop passed from the parent.

优先顺序可能看起来违反直觉，但它允许通过从父级传递的 className 属性来自定义在 css 属性上定义样式的组件。

The `P` component in this example has its default styles overridden in the `ArticleText` component.

本示例中的 P 组件的默认样式在 ArticleText 组件中被覆盖。

```js
const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'Sans-Serif',
      color: 'black'
    }}
    {...props} // <- props contains the `className` prop
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props} // <- props contains the `className` prop
  />
)
```

The ArticleText component can be customized and the styles composed with its default styles. The result is passed P and the process repeats.

ArticleText 组件可以自定义，并且样式可以与其默认样式组合。结果被传递给P并重复该过程。

```js
const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'sans-serif',
      color: 'black'
    }}
    {...props} // <- props contains the `className` prop
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props} // <- props contains the `className` prop
  />
)

const SmallArticleText = props => (
  <ArticleText
    css={{
      fontSize: 10
    }}
    {...props} // <- props contains the `className` prop
  />
)
```

The styles are concatenated together and inserted via `insertRule`.

这些样式连接在一起并通过 insertRule 插入。

1. `P` component

```css
.css-1 {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  font-family: sans-serif;
  color: black;
}
```

2. `ArticleText` component
```css
.css-2 {
  font-size: 14px,
  font-family: Georgia, serif,
  color: darkgray;
}
```

3. `SmallArticleText` component
```css
.css-3 {
  font-size: 10px;
}
```

4. Result

```css
.css-result {
+ margin: 0;
- font-size: 12px;
+ line-height: 1.5;
- font-family: 'sans-serif';
- color: black;
- font-size: 14px,
+ font-family: Georgia, serif,
+ color: darkgray;
+ font-size: 10px;
}
```

Relying on the css spec's "Order of Appearance" rule, property values defined later (green) override those before it (red).

根据 CSS 规范的“外观顺序”规则，后面定义的属性值（绿色）将覆盖之前定义的属性值（红色）。


### Gotchas

* If you include the plugin @babel/plugin-transform-react-inline-elements in your .babelrc your styles will not be applied. The plugin is not compatible with the css prop.

如果您在 .babelrc 中包含插件 @babel/plugin-transform-react-inline-elements 您的样式将不会被应用。该插件与 css 属性不兼容。

* When using React.cloneElement you can't easily add a css prop if the cloned element doesn't already have it. Otherwise React.cloneElement works with jsx-created elements.

使用 React.cloneElement 时，如果克隆的元素尚不具备 css prop，则无法轻松添加它。否则，React.cloneElement 可与 jsx 创建的元素一起使用。
