---
layout: Post
title: 【Css In Js】长文-emotion.js简明教程
subtitle: 基于emotion官网文档的翻译
author: Align
date: 2023-10-13
headerImage: /img/in-post/covers/emotions.js简明教程.png
tags:
  - 前端
  - emotion
  - Css In Js
---

加入了一些自己的理解

<!-- more -->


## 起步

### 介绍

[Emotion](https://emotion.sh/docs/introduction) is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities.Both string and object styles are supported.

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

//示例中css函数其实会返回一个独一无二并绑定了指定样式的类名，emo通过这种方式应用样式
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
如果你使用了Create React App创建的React应用，请使用babel包。

:::

Emotion has an optional Babel plugin that optimizes styles by compressing and hoisting them and creates a better developer experience with source maps and labels.

emo提供一个可选的Babel插件，该插件可以通过压缩和提升样式来优化样式，并通过源映射和标签创建更好的开发人员体验。

下面我们来安装并配置这个插件：

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

有两种方式来让你的元素支持css属性

* [Babel Preset](#babel-preset)
* [JSX Pragma](#jsx-pragma)

Both methods result in the same compiled code. After adding the preset or setting the pragma as a comment, compiled jsx code will use emotion's jsx function instead of React.createElement.

这两种方式最终都会生成生成相同的代码。添加babel preset或在文件中设置pragma注释后，当babel处理react组件时将不会使用react官方的createElement函数来创建组件，而是使用emo提供的的js函数，以此来实现对css属性的支持。

|   |  *Input*|                     *Output*                      |
|:-:|:-:|:-------------------------------------------------:|
|Before|`<img src="avatar.png" />`|`React.createElement('img', { src: 'avatar.png' })`|
|After|`<img src="avatar.png" />	`|        `jsx('img', { src: 'avatar.png' })`        |

#### Babel Preset

This method will not work with Create React App or other projects that do not allow custom Babel configurations. Use the JSX Pragma method instead.

该方法不适用通过react脚手架的create React App指令创建或其他不支持常规Babel配置的项目(未使用babel或无法修改babel配置意味着无法让emo处理css属性)，请用JSX Pragma方式替代。

**.babelrc**

```shell
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```
If you are using the compatible React version (>=16.14.0) then you can opt into using the new JSX runtimes by using such configuration:

如果你使用兼容版本的react(版本大于等于16.14.0)，你可以通过修改以下配置来使用新的react runtime

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

也可以通过在文件顶部设置该注释的方式来支持css属性需要。不过这种方式适合在项目中测试css属性的可用性或者不支持更改babel配置的项目中。


`/** @jsx jsx */`

Similar to a comment containing linter configuration, this configures the jsx babel plugin to use the jsx function instead of React.createElement.

和上面在babel中配置的效果相同，这将迫使babel使用emo的jsx方法来处理react组件。

If you are using a zero-config tool with automatic detection of which runtime (classic vs. automatic) should be used and you are already using a React version that has the new JSX runtimes (hence runtime: 'automatic' being configured automatically for you) such as Create React App 4 then /** @jsx jsx */ pragma might not work and you should use /** @jsxImportSource @emotion/react */ instead.

这句话我暂时没看懂。

[JSX Pragma Babel Documentation](https://babeljs.io/docs/babel-plugin-transform-react-jsx#pragma)

#### Import the jsx function from @emotion/react

```js

/** @jsx jsx */
import { jsx } from '@emotion/react'

```

Note that excluding this will cause your css to render as [Object Object].

请注意正确导入jsx函数，否则你的css将被渲染为[Object Object]

#### Use the css prop

Any component or element that accepts a className prop can also use the css prop. The styles supplied to the css prop are evaluated and the computed class name is applied to the className prop.

任何能接受 className 属性的组件或元素都可以使用 css 属性。emo将评估提供给 css 属性的样式，并将最终将计算出的类名应用于该组件/元素的className属性上。

(emo处理传递给css属性的样式并据此生成一个唯一的classname名，然后合并到到react元素的className属性上。)

### 对象风格(Object Styles)

The css prop accepts object styles directly and does not require an additional import.
css属性支持对象的形式的参数。

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

::: warning
css from @emotion/react does not return the computed class name string. The function returns an object containing the computed name and flattened styles. The returned object is understood by emotion at a low level and can be composed with other emotion based styles inside of the css prop, other css calls, or the styled API.

请注意从react版本的emo中导出的css方法并不是单纯的返回一个唯一的类名字符串，这一点与通用版本不同。该函数返回一个包含计算名称和扁平化样式的对象。
返回的对象可以被低级别的emo所理解，并且可以与 css属性内的其他基于emo的样式、其他 css 调用或styled API 组合。

:::

You can also pass in your css as variables, which allows for composition (read more about this [here](https://emotion.sh/docs/composition)).

您还可以将 css 作为变量传递，这样就可以进行组合（在此处阅读有关此内容的更多信息）。

### 样式优先级(Style Precedence)

* Class names containing emotion styles from the `className` prop override `css` prop styles.
  * className属性的类名中，如果类名的样式中包含了emo样式，那么该样式会覆盖掉css属性中冲突的样式。
* Class names from sources other than emotion are ignored and appended to the computed emotion class name.
  * 非类名中非emo创建的类名将会被忽略，并在最后被添加到计算好的类名中。


The precedence order may seem counter-intuitive, but it allows components with styles defined on the css prop to be customized via the className prop passed from the parent.

优先顺序可能看起来违反直觉，但是这种优先级规则能保证组件上通过css属性定义的样式可以被父组件通过传递className来改变。


The `P` component in this example has its default styles overridden in the `ArticleText` component.

本示例中的 P 组件的样式在 ArticleText 组件中被覆盖。

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
    {...props} // <- 属性中包含 `className` prop
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props} // <- 属性中包含 the `className` prop
  />
)
```

The ArticleText component can be customized and the styles composed with its default styles. The result is passed P and the process repeats.

ArticleText 组件同样可以自定义，自定义的样式会与其默认样式组合。组合结果被传递给P组件并重复该过程。

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


#### Gotchas

* If you include the plugin @babel/plugin-transform-react-inline-elements in your .babelrc your styles will not be applied. The plugin is not compatible with the css prop.

如果您在 .babelrc 中包含插件 @babel/plugin-transform-react-inline-elements 您的样式将不会被应用。该插件与 css 属性不兼容。

* When using React.cloneElement you can't easily add a css prop if the cloned element doesn't already have it. Otherwise React.cloneElement works with jsx-created elements.

使用 React.cloneElement 时，如果克隆的元素尚不具备 css prop，则无法轻松添加它。否则，React.cloneElement 可与 jsx 创建的元素一起使用。



### Styled Components (样式化组件)

`styled` is a way to create React components that have styles attached to them. It's available from [@emotion/styled](https://emotion.sh/docs/@emotion/styled). `styled` was heavily inspired by [styled-components](https://styled-components.com/) and [glamorous](https://glamorous.rocks/).

styled 是一种创建附加样式的 React 组件的方法。它可以从 @emotion/styled 获得。 styled 深受 styled-components 和 glamorous的启发。

#### Styling elements and components(对组件和元素应用样式)

`styled` is very similar to css except you call it with an html tag or React component and then call that with a template literal for string styles or a regular function call for object styles.

styled 方法 与 css方法 非常相似，只不过接收的参数是 html 标签或 React 组件，同时其返回值是一个接收和css方法接收参数一致的函数，再次调用该函数可以获得应用了对应样式的组件或元素。


下面实例演示了创建一个拥有自定义文字颜色的按钮:

```js
import styled from '@emotion/styled'

const Button = styled.button`
  color: turquoise;
`

render(<Button>This my button component.</Button>)
```


#### Changing based on props(基于属性修改样式)

Any interpolations or arguments that are functions in styled are called with props, this allows you to change the styles of a component based on the props.

你可以通过以下方式获取到组件或者元素的props并进行不同的样式渲染:

```js
import styled from '@emotion/styled'

const Button = styled.button`
  color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
`

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

render(
  <Container column>
    <Button>This is a regular button.</Button>
    <Button primary>This is a primary button.</Button>
  </Container>
)
```


#### Styling any component(给组件设置样式)

`styled` can style any component as long as it accepts a className prop.

styled可以为任何支持className的组件设置样式(原理我们上面提到过)。

```js
import styled from '@emotion/styled'

const Basic = ({ className }) => <div className={className}>Some text</div>

const Fancy = styled(Basic)`
  color: hotpink;
`

render(<Fancy />)

//该示例中，Basic组件接收了meo生成的类名并引用到组件的元素上
```

#### Change the rendered tag using `withComponent`(使用withComponent更改渲染的标签)

Sometimes you want to create some styles with one component but then use those styles again with another component, the `withComponent` method can be used for this. This was inspired by (styled-components' `withComponent`)[https://styled-components.com/docs/api#withcomponent].

有时候你给一个组件定义好样式后可能会想把这些样式应用到另一个组件上，withComponent方法就是为此诞生的，该方法的灵感来源于styled-components'的 `withComponent`方法。

```js
import styled from '@emotion/styled'

const Section = styled.section`
  background: #333;
  color: #fff;
`

// this component has the same styles as Section but it renders an aside
const Aside = Section.withComponent('aside')

render(
  <div>
    <Section>This is a section</Section>
    <Aside>This is an aside</Aside>
  </div>
)
```

#### Targeting another emotion component(定位另一个emotion组件)

Similar to [styled-components](https://styled-components.com/docs/faqs#can-i-refer-to-other-components), emotion allows for emotion components to be targeted like regular CSS selectors when using [@emotion/babel-plugin](https://emotion.sh/docs/@emotion/babel-plugin).

和styled-components类似，你可以像写css选择器的方式来定位emotion组件并设置样式，但是前提是需要@emotion/babel-plugin插件的支持。

```js
import styled from '@emotion/styled'

const Child = styled.div`
  color: red;
`

const Parent = styled.div`
  ${Child} {
    color: green;
  }
`

render(
  <div>
    <Parent>
      <Child>Green because I am inside a Parent</Child>
    </Parent>
    <Child>Red because I am not inside a Parent</Child>
  </div>
)
```

对应的对象形式的写法如下:

```js
import styled from '@emotion/styled'

const Child = styled.div({
  color: 'red'
})

const Parent = styled.div({
  [Child]: {
    color: 'green'
  }
})

render(
  <div>
    <Parent>
      <Child>green</Child>
    </Parent>
    <Child>red</Child>
  </div>
)
```

```js
import styled from '@emotion/styled'

const H1 = styled.h1(
  {
    fontSize: 20
  },
  props => ({ color: props.color })
)

render(<H1 color="lightgreen">This is lightgreen.</H1>)
```


#### Customizing prop forwarding(自定义Prop转发)

By default, Emotion passes all props (except for `theme`) to custom components and only props that are valid html attributes for string tags. You can customize this by passing a custom `shouldForwardProp` function. You can also use `@emotion/is-prop-valid` (which is used by emotion internally) to filter out props that are not valid as html attributes.

默认情况下，styled函数会转发除了theme属性以外的所有props和所有有效的html元素属性给自定义组件。
您可以通过传递自定义的 shouldForwardProp 函数来自定义需要传递给自定义组件的props。您还可以使用 @emotion/is-prop-valid （emo内部使用）来过滤掉作为对于html 属性非法的props。

```js
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'

const H1 = styled('h1', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})(props => ({
  color: props.color
}))

render(<H1 color="lightgreen">This is lightgreen.</H1>)

//color属性来对h1没有意义，所以过滤掉
```

#### Composing dynamic styles(创建动态样式)

You can create dynamic styles that are based on props and use them in styles.

你可以创建基于props的动态样式并在样式中使用。


#### `as` prop

To use styles from a styled component but change the element that's rendered, you can use the as prop.

可以使用as属性指定要渲染的元素。

```js
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`

render(
  <Button as="a" href="https://github.com/emotion-js/emotion">
    Emotion on GitHub
  </Button>
)
```

::: info
The `as` prop is only used by styled when it's not forwarded to the underlying element. By default, this means that the as prop is used for html tags and forwarded for components. To change this, you can pass a custom `shouldForwardProp` which returns true for 'as' to forward it or returns false for 'as' to use it and not forward it.

只有当as属性没有转发到下层组件或元素时才会被styled函数使用。所以默认情况下as属性将会被html元素使用或者转递给组件。当然你可以通过配置shouldForwardProp来改变默认行为，例如过滤掉as让styled使用该参数，或是不过滤让下层组件或元素使用。
:::


#### Nesting components(嵌套组件)

以下示例演示了css嵌套选择的用法:


```js
import styled from '@emotion/styled'

const Example = styled('span')`
  color: lightgreen;

  & > strong {
    color: hotpink;
  }
`

render(
  <Example>
    This is <strong>nested</strong>.
  </Example>
)
```
