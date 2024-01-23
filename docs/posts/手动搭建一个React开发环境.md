---
layout: Post
title: 手动搭建一个React开发环境
subtitle: 了解下前端项目构建
author: Align
date: 2023-10-16
headerImage: /img/in-post/covers/手动搭建react开发环境.png
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
  * prettier，eslint, lint-staged和husky
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
* 指定`lib`属性为`["ES2015", "DOM"]`，因为我们在编码中会使用到ES5(Array,Function,Object...等等)变量和浏览器的变量和API(例如console,window等)。使用这些变量也是需要ts类型的否则ts编译会报错，好在的这些类型声明ts都已经集成，我们只需在这里配置使用即可。
* `jsx`属性我们设置为`react`。因为我们会用到jsx，配置这个属性ts才会理解和处理jsx语法。实际上，该属性控制着将jsx语法生成那种形式的文件，我们都知道react其实是通过`React.createElement`来创建组件，该属性配置为react后就是告诉ts编译器将jsx语法转换为react的`React.createElement`形式。当然你也可以配置为`preserve`，这将不处理jsx语法直接返回。
* 最后，我们设置`esModuleInterop`为`true`。许多库打包后是使用的是commonjs规范，当你习惯的使用es6的import导入时ts会报错提示你不兼容的。开启该配置让ts编译器在遇到这种情况时做下特殊处理,保证能正确导入。

配置完毕，`npm install react react-dom`安装react，安装react的类型声明文件`npm install @types/react --save-dev`,编写一个react组件。

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

样式的主要代码我们使用Mui来解决，所以一般我们不需要额外的样式文件。不过为了不时之需我们这里任然配置下。

### loader配置
webpack提供了良好的loader来让我们处理样式文件,下面我们安装这些需要的loader。

```shell
npm install --save-dev style-loader css-loader
```
同时修改webpack的module字段的配置,在rule中添加以下代码：

```js
{
  test: /\.css$/i,
  use: ['style-loader', 'css-loader']
},
```

大部分情况下上述两个模块都会一同使用，其中css-loader负责将css文件的样式转换为js对象模块，style-loader会将这些模块注入到页面上(默认行为是通过style标签注入)。

webpack遇到css文件时将会调用上述两个loader处理css。注意上面两个loader的顺序，因为loader会逆序执行，我们需要先执行css-loader。

::: info

webpack 根据正则表达式确定应该查找哪些文件，并将其提供给指定的 loader。在此示例中，所有以 .css 结尾的文件，都将被提供给 style-loader 和 css-loader。

:::


现在你可以在项目中使用`import './style.css'`的语法导入你的样式文件，被导入的样式文件将会被打包进结果。

让我们在src文件夹下创建一个index.css文件：

```css
.app {
    font-size: 24;
}
```

然后在index.tsx中导入index.css，就像下面这样:

```js

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const App = () => <div>111</div>;
document.body.innerHTML = '<div id="app"></div>';
console.log("debugger");
const root = createRoot(document.querySelector("#app") as any);
root.render(<App></App>);

```

好，这样你就获得了一个ts编译报错,提示无法找到'./index.css'模块。

事实上代码的执行是没有问题的，添加`//@ts-ignore`忽略这行代码可以看到代码运行没有报错，只是在ts的编译阶段，ts编译器无法找到该样式文件的声明信息，ts编译器无法理解导入的是个什么东西。

### 声明样式的ts类型

现在我们得为这些导入的非脚本文件添加类型声明。

由于我们会在任意文件中导入，所以我们直接在全局项目根目录下声明这些文件，将其声明为模块。

在根目录下创建`types.d.ts`作为全局的声明文件，当然文件名你可以随便起。

文件中让我声明后缀为css文件的模块，就像下面这样:

```js
declare module "*.css";

```

现在ts编译器就知道我们import的css文件是一个模块了，注意如果配置后报错仍然存在请重启项目或编辑器即可。

当然一般情况下我们不止会导入css,还会导入一些其他类型静态资源，这里我们一起声明完，最终的声明文件会是这样:

```js
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.pdf";
declare module "*.webp";
```

打开页面你可以看到webpack自动生成的style标签，内部有我们声明的样式，给组件添加一个app类名，可以看到样式成功生效了。


### css module

一般情况下，我们更推荐使用css module的模式来导入样式，这样可以很好的定义样式作用域。

使用css-loader默认会开启css module模式，我们无需额外的配置。loader默认会把文件名符合`/\.module\.\w+$/i.test(filename)` 与 `/\.icss\.\w+$/i.test(filename)`的文件识别为css module文件进行处理。

现在在src文件夹中创建一个index.nodule.css并声明样式:

```css
.app {
    font-size: 24px;
}
```

现在你可以在index.tsx中使用`import style from './index.module.css'`的方式导入样式文件，并在组件中绑定类名应用样式:

```js
import React from "react";
import { createRoot } from "react-dom/client";
import style from "./index.module.css";
const App = () => <div className={style.app}>111</div>;
document.body.innerHTML = '<div id="app"></div>';
console.log("debugger");
const root = createRoot(document.querySelector("#app") as any);
root.render(<App></App>);

```
::: warning

使用css module请遵循样式文件的命名规范`*.module.**ss`。否则webpack将不会识别为css module模块。

:::


### 路径别名 

随着我们的文件增多，文件导入路径将会很难记，让我们像所有项目一样为我们的项目配置好别名(其实我自己早就偷偷配好了)。

修改webpack和ts配置文件:

* webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  mode:'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',//创建source-map映射文件
  devServer: {
      static: './dist',
      hot: true,
  },
  resolve: {
    // 未指定后缀名的文件将尝试使用下列后缀进行拓展查找
    extensions: [".ts", ".tsx", ".js"],
    alias: {
        '@': path.resolve(__dirname, 'src'), // 配置路径别名
      },
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
     ".js": [".js", ".ts"],
     ".cjs": [".cjs", ".cts"],
     ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
      {
        test: /\.css$/i,
        use: [{
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: {
              namedExport: true,
            },
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
};
```

* tsconfig.json

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "ES5" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "lib": ["ES2015", "DOM"] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
    "jsx": "react" /* Specify what JSX code is generated. */,
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,
    "paths": {
      "@/*": ["src/*"]
    },
    "rootDir": "./" /* Specify the root folder within your source files. */,
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    "baseUrl": "./" /* Specify the base directory to resolve non-relative module names. */,
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}

```

### scss和less支持

这里我们使用scss举例。

#### 安装scss和loader

```shell
npm install sass-loader sass --save-dev
```

#### 配置loader

我们的scss代码需要在处理前先使用scss转换一下，添加下面的规则:

```js
{
  test: /\.s[ac]ss$/i,
    use: [
    // 将 JS 字符串生成为 style 节点
    'style-loader',
    // 将 CSS 转化成 CommonJS 模块
    'css-loader',
    // 将 Sass 编译成 CSS
    'sass-loader',
  ],
},
```

现在我们的项目也支持css预处理语言了。

## 静态文件

我们一般也会import一些图片或其他静态资源，让我们配置webpack使用loader来处理这些静态资源。

webpack5已经默认内置了这个功能，所以我们直接开启它。在rules中增加如下配置:

```js
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
},
```

根目录下创建assets目录存放我们的图片,接着在我们的项目中使用他:

```js
import React from "react";
import { createRoot } from "react-dom/client";
import style from "@/index.module.scss";
import avatar from "@/../assets/avatar.jpg";
import "@/index.css";
console.log(style);
const App = () => (
  <>
    <div className={style.app}>111</div>
    <img src={avatar} alt="" />
  </>
);
document.body.innerHTML = '<div id="app"></div>';
console.log("debugger");
const root = createRoot(document.querySelector("#app") as any);
root.render(<App></App>);

```


## 完善项目结构

webpack的 配置我们暂时结束。目前我们的项目结构还很乱，现在我们参照react的create指令构造的项目结构修改我们的目录。

### 入口文件

修改我们的入口文件，因为我们只用他来挂载应用:

* index.tsx

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.body.innerHTML = '<div id="app"></div>';
const root = createRoot(document.querySelector("#app") as any);
root.render(<App></App>);

```

src目录下创建App.tsx文件，这是我们的项目入口文件:

* App.tsx

```js
import React from "react";
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter(routes);
export default () => <RouterProvider router={router}></RouterProvider>;

```

### 路由

我们使用react-router来管理我们的单页面应用，安装router:

```shell
npm install react-router-dom
```

src目录下我们创建routes文件夹并创建index.ts文件用来存放我们的路由:

```js
import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import User from "@/pages/User";

export default [
    {
        path:'/',
        index:true,
        Component:Home
    },
    {
        path:'/user',
        Component:User
    }
] as Array<RouteObject>
```

最后 在src目录下创建pages文件夹创建我们的Home和User组件:

* Home.tsx

```js
import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <>
      <div>home</div>
      <Link to={"/user"}>user</Link>
    </>
  );
};

```

* User.tsx

```js
import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <>
      <div>user</div>
    </>
  );
};

```

### 使用browserRouter

启动我们的项目，点击user可以跳转到user页面。但是刷新页面后会提示404错误，这是开发环境的老问题，使用hash路由可以解决。但是我们这里不适用hash路由，让我们修改webpack服务的配置:

```js
devServer: {
  static: "./dist",
  hot: true,
  historyApiFallback:true
},
```

`historyApiFallback`确保我们以任意路径访问本地服务器都会返回项目入口。


## 代码格式化

约束代码和提交风格，哪怕是个人开发项目我也愿意配置代码约束。

### 安装Eslint

运行`npm init @eslint/config`指令初始化eslint。

```shell
# 你准备用eslint做什么
√ How would you like to use ESLint? · style
# 项目使用了那种模块化方案
√ What type of modules does your project use? · esm
# 项目使用的框架
√ Which framework does your project use? · react
# 项目是否使用了react
√ Does your project use TypeScript? · No / Yes
# 你的项目运行在浏览器还是node
√ Where does your code run? · browser
# 使用现有流行的代码风格还是自己自定义一套(这里我们选择自定义)
√ How would you like to define a style for your project? · prompt
# 你希望创建那种格式的eslint配置文件
√ What format do you want your config file to be in? · JavaScript
# 缩进使用几个空格
√ What style of indentation do you use? · 4
# 字符串使用单引号还是双引号
√ What quotes do you use for strings? · double
# 使用那种系统的换行符
√ What line endings do you use? · windows
# 每行结尾是否使用分号
√ Do you require semicolons? · No / Yes
```
配置完成后你会发现项目红了,因为我们的代码不符合我们刚刚配置的规范，按照eslint的提示修改代码格式即可。

#### Component definition is missing display name

eslint会提示我们的组件有这个问题(让我们给组件配置名称方便debugger)，这里我们不打算给组件配置名字，所以我们关掉这条规则即可。

```js
"react/display-name":"off"
```

::: info

规则的开启和关闭可查阅eslint的官网了解，或者点击编辑器中eslint错误弹窗中的规则地址前往对应文档

:::

我们的webpack.config.js也会被eslint检测，让我们创建.eslintignore忽略那些不需要检测的文件。

### 安装prettier

```shell
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

prettier和eslint都可以检测代码格式，为了让二者不会冲突我们需要安装对应的插件使二者能相互配合。
* eslint-config-prettier 的作用是关闭eslint中与prettier相互冲突的规则。
* eslint-plugin-prettier 的作用是赋予eslint用prettier格式化代码的能力

修改eslint文件，让eslint采用prettier的风格:

```js
module.exports = {
  env: {
    browser: true,

    es2021: true,
  },

  extends: [
    "eslint:recommended",

    "plugin:@typescript-eslint/recommended",

    "plugin:react/recommended",
  ],

  overrides: [
    {
      env: {
        node: true,
      },

      files: [".eslintrc.{js,cjs}"],

      parserOptions: {
        sourceType: "script",
      },
    },
  ],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",

    sourceType: "module",
  },

  plugins: ["@typescript-eslint", "react", "prettier"],

  rules: {
    //"linebreak-style": ["error", "windows"],

    "prettier/prettier": "error",

    "react/display-name": "off",
  },
};
```

创建.prettierrc配置文件，我们可以参照prettier官网定义自己想要的代码格式化方案。

::: info

我们让eslint专门进行语法检测，prettier专门进行代码风格格式化。所以我们配置eslint使用prettier插件，让eslint优先采取prettier的代码风格规范。

:::

::: warning

eslint和prettier我研究的不算多，后面专门开个栏目研究下。

:::

### husky和lint-staged

通过配置这两个库帮助我们在git提交前检查代码规范，未通过检查的代码将强制无法提交。

git提供了一些关键时刻执行用户行为的hook，这也是husky实现的基础，这里我们主要使用commit-msg和pre-commit两个钩子。

#### husky

husky提供了快捷脚本来一键安装并配置:

```shell
npx husky-init && npm install

```

不过我们这里不使用这个脚本，我们按常规方式安装并了解上边的脚本做了些什么。

##### install(husky.v8)

```shell
npm install husky --save-dev
```

##### 安装husky的依赖
```shell
npx husky install
```
执行成功后项目根目录将会出现.husky/文件夹。

husky必须要执行上述脚本安装依赖后才能运行,如果其他用户拉取了我们的项目忘记执行该脚本那么husky将无法生效，所以一般会在package.json中增加对应的脚本(prepare)，在项目启动前执行该prepare脚本。

```json
{
  "scripts": {
    "prepare": "husky install" 
  }
}
```
##### 配置钩子

```shell
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

上述指令帮我们创建了一个pre-commit钩子，这个钩子会在git commit之前触发。这个指令的本质是在.husky/下创建对应hook名的脚本文件，该脚本会帮我们执行npm test指令。
如果npm test指令执行失败，commit将会中断。

同理我们添加一个commit-msg钩子，来检测用户提交的描述是否规范。

```shell
npx husky add .husky/commit-msg "your command"
git add .husky/commit-msg
```

##### 卸载husky

```shell
npm uninstall husky && git config --unset core.hooksPath
```

#### lint-staged

我们使用husky在代码commit之前检测用户代码是否符合prettier和eslint的要求，目前有个问题是这个检测会对项目中的所有文件生效，所以随着项目越来越大检测时间会变得越来越长。实际上我们只需要检测用户提交的暂存代码，这里我们使用lint-staged来让检测只发生在暂存区的代码上。

##### 安装

```shell
npm install --save-dev lint-staged # requires further setup
```

##### 配置

lint-staged有许多配置方法，我们这里直接在package.json中配置。以下是官网的一个示例:

```json
{
  "lint-staged": {
    "*": "your-cmd"
  }
}
```

配置为键值对的形式，键为匹配的文件，值则是对应执行的脚本。
所以我们可以配置如下配置来让prettier帮我们格式化文件:
```json
"lint-staged": {
    "*.{js,ts,tsx,jsx}": "prettier --write"
  },
```
上述配置中我们匹配暂存区下的所有`"*.{js,ts,tsx,jsx}"`文件并用eslint检测,对所有`*.{json,yml,css,scss}`文件我们使用prettier。

### todo

## Css In Js

个人感觉cij很方便，这里我们使用mui作为我们的cij方案。

### 安装Mui

安装请参照本站的的Mui system文档，因为是我自己翻译的可能会有错误所以原文也一并搬过来了。

### 使用主题

参照本站的mui system主题文档可了解如何在项目中配置使用主题。我个人现在是比较推荐使用主题的，整站切换风格会很方便。


