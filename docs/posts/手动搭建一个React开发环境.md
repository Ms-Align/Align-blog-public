---
layout: Post
title: 手动搭建一个React开发环境
subtitle: 了解下前端项目构建
author: Align
date: 2023-10-16
headerImage: /img/in-post/2021-12-24/header.jpg
tags:
  - 前端
  - React
---


最近有计划新做一个小web工具，同时前几天查资料的时候发现一些前端的构建工具又忘的差不多了，所以这里不打算使用`create`指令创建项目了，直接从头搭建一个。

<!-- more -->

首先列举下用到的工具。
* 语言
  * typescript
* 框架
  * react
* 代码格式化及校验工具
  * prettier，eslint和husky
* 打包器
  * webpack
* css in js工具
  * Mui system
* 部署与发布
  * docker构建镜像，部署到腾讯云服务器上。

下面我们一步一步开始。

## 项目初始化

初始化我们直接使用`npm init -y`创建一个默认的package文件，一些无关紧要的配置我们暂时不用修改。现在在同级目录下(我们后续将package所在目录称为根目录,即`./`)创建一个index.js文件，我们先来尝试运行下该文件。

在该文件中编写任意js代码，例如:

`console.log(123)`

了解过node的知道wom可以直接`node index.js`运行该文件，但是我们不这么做。下面在package文件中修改运行脚本配置，如下:

```json
{
  "name": "align-mini",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
好。现在我们可以通过`npm run dev`来运行该文件了。

### 使用typescript

js到此为止，我们现在将项目改成typescript支持。

`npm install typescript --save-dev`安装ts包。现在我们有了把ts编译成js的工具，现在运行前我们需要将ts转变成js再执行，所以修改我们的dev指令如下
`"dev": "npx tsc index.ts && node index.js"`。现在在代码执行前会先执行`tsc`指令将ts文件转换为js，然后我们执行该js文件。

你会发现根目录下生成了对应的js文件，这是`npx tsc index.ts`执行的结果。为了控制ts的解析和构建配置，我们需要创建一个tsconfig.json文件。

### 创建tsconfig文件

ts官方提供了指令 帮助我们快速创建你一个ts文件。如果全局安装了ts，可以直接`tsc --init`否则在项目根目录下运行`npx tsc --init`。

现在我们基于一个react项目做一些简单的配置。
* `target`属性我们配置为`ES5`，这样ts在编译时将会把我们的代码转变成es5的语法，获得更好的浏览器支持。
* 指定`lib`属性为`["ES2015", "DOM"]`，因为我们在编码中会使用到ES5(Array,Function,Object...等等)变量和浏览器的变量和API(例如console,window等)。使用这些变量也是需要ts类型的否则ts编译会报错，好在的这些类型申明ts都已经集成，我们只需在这里配置使用即可。
* `jsx`属性我们设置为`react`。因为我们会用到jsx，配置这个属性ts才会理解和处理jsx语法。实际上，该属性控制着将jsx语法生成那种形式的文件，我们都知道react其实是通过`React.createElement`来创建组件，该属性配置为react后就是告诉ts编译器将jsx语法转换为react的`React.createElement`形式。当然你也可以配置为`preserve`，这将不处理jsx语法直接返回。
* 最后，我们设置`esModuleInterop`为`true`。许多库打包后是使用的是commonjs规范，当你习惯的使用es6的import导入时ts会报错提示你不兼容的。开启该配置让ts编译器在遇到这种情况时做下特殊处理,保证能正确导入。

配置完毕，`npm install react react-dom`安装react，安装react的类型申明文件`npm install @types/react --save-dev`,编写一个react组件。

```js
import React from "react";
const app = () => <div>123</div>;
console.log(app());

```

修改下目录结构，将index.tsc放到src文件下。

dev指令也做些修改，ts会自己查找tsconfig.json文件，所以我们不需要配置文件。
```json
    "dev": "npx tsc && node src/index.js"
```
最后执行`npm run dev`。你将能看到打印出的组件对象信息。


## webpack打包

我们的项目已经支持了tsx，接下来我们就要考虑打包的问题，上面我们使用ts的时候生成文件都是直接生成在对应源文件下的，tsconfig内是可以配置生成文件的目录的，我们放到打包环节一起处理。现在我们安装webpack。

`npm install --save-dev webpack`

### 创建webpack配置文件

创建一个webpack配置文件，配置如下:

```js
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode:'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
在上面的配置文件中，我们只定义了打包的入口文件和打包后的文件的输出位置。修改package.json，增加打包指令:

```json
"build": "webpack"
```

运行`npm run build`。

打包失败，webpack提示我们需要配置对应loader。由于我们的项目并不是.js文件而是.tsx。webpack本身无法读懂.tsx文件的相关语法，所以我们需要配置相关loader来处理.tsc文件。ts不是能读懂么？是的，让我们把ts和webpack结合起来，在用webpack打包之前使用ts先将ts/tsx文件转化为js文件。

### 配置loader

下载ts-loader：

```shell
npm install ts-loader --save-dev
```
修改webpack配置文件，在module字段中配置:

```js
module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ]
  }
```
上述配置告诉webpack所有.ts/.cts/.mts/.tsx的文件在打包前都使用ts-loader处理下。ts-loader，会使用ts编译器和我们本地的tsconfig配置来处理相关文件。

再次运行`npm run build`。打包后的目录将会出现在根目录的dist文件夹下。

打包后的main.js文件我们可以直接运行，`node dist/main.js`。将会打印出和打包前一样的运行结果,就像下面这样:

```js
{
  '$$typeof': Symbol(react.element),
  type: 'div',
  key: null,
  ref: null,
  props: { children: '123' }
  _owner: null
}
```

太好了，基本的打包也没有问题了。

### 开发环境热更新

webpack的配置复杂而又精细。我们目前的打包仅仅是入了个门。

作为一个web开发项目，项目本地启动和热更新自然也是不能缺少的。一个较为简单的热更新web应用就是本地node起一个服务挂载打包后的文件，同时监听本地文件的修改触发重新打包并通知浏览器更新页面。webpack提供了webpack-dev-server插件来实现上述功能，让我们来安装他:

```shell
npm install --save-dev webpack-dev-server

```
然后修改webpack配置增加`devServer`字段。

```js
 devServer: {
      static: './dist',
      hot: true,
  },
```

上述配置信息告诉webpack将dist文件夹下的目录挂在到本地服务器上，并启用热更新。

::: info

webpack-dev-server 会从 output.path 中定义的目录中的 bundle 文件提供服务，即文件可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。

:::

::: warning

webpack-dev-server 在编译之后不会写入到任何输出文件，而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，可以通过 dev server 配置中的 devMiddleware.publicPath 选项进行修改

:::

接下来修改package.json中的dev指令，让我们用webpack-server来启动我们的项目：

```js
"dev": "webpack serve --open",
```
让我们`npm run dev`启动服务。webpack默认打开8080端口，打开后的页面中列出了打包后生成的静态文件，这是webpack自动生成的页面，因为我们没有配置自己的html页面。

对于一个react应用，我们需要一个react页面来挂载应用。

让我们创建一个html文件...

不，这里我们同样使用webpack提供的插件来构建html文件。html-webpack-plugin插件帮助我们快速的创建一个html文件到打包文件中，这样项目中就不必保留html文件。

安装插件：

`npm install --save-dev html-webpack-plugin`

修改配置文件使用该插件:
```js
plugins: [
    new HtmlWebpackPlugin({
    }),
  ],
```
创建的html文件会通过script标签加载生成的打包文件。再次打开服务会出现一个空白页面，开发者工具的network下可以看到加载的html和打包文件。
修改源码并保存可以看到页面自动刷新，热更新成功。

### 渲染页面

我们的页面是空白的，因为没有渲染组件。同时还弹出几个打包后文件过大的警告，让我们先忽视这些警告，编写代码渲染出我们的组件。

修改index.tsx,编写代码渲染react组件:
```js
import React from "react";
import { createRoot } from "react-dom/client";

const App = () => <div>Align</div>;
document.body.innerHTML = '<div id="app"></div>';
console.log("debugger");
const root = createRoot(document.querySelector("app"));
root.render(<App></App>);

```

现在页面上将能正确渲染组件。我们已经初步配置了一个支持热更新的react的项目，接下来我们通过优化配置和加入更多技术栈来优化开发体验。

## 样式


