---
layout: Post
title: 【Prettier】代码格式化入门
subtitle: 帮助快速入门并使用prettier
author: Align
date: 2023-11-20
headerImage: /img/in-post/covers/prettier入门.png
tags:
  - 前端
  - prettier
---

帮助快速了解[Prettier](https://www.prettier.cn/docs/index.html)及其使用方法。

<!-- more -->

## 什么是prettier

prettier(下称Prt)是一个代码格式化工具,支持以下语言:

* JavaScript (包括实验性质的特性)
* JSX
* Angular
* Vue
* Flow
* TypeScript
* CSS, Less, and SCSS
* HTML
* Ember/Handlebars
* JSON
* GraphQL
* Markdown, including GFM and MDX v1
* YAML

它删除了所有原始样式并确保所有输出的代码符合一致的样式规则。

本质上Prt是读取用户的代码并按照一定的样式规则重新写入，通过这种样式来帮助用户快速格式化代码风格。


## 安装使用

### 通过npm安装

```shell
npm install --save-dev --save-exact prettier
```

现在我们可以通过Prt提供的指令来格式化代码，Prt会检测处理当前文件夹下的文件，但在此之前让我们先创建Prt的配置文件以便更好的使用Prt。

### 配置文件

官网示例是通过node指令来创建的配置文件：
```shell
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

这个脚本本质上是通过node创建一个.prettierrc配置文件，我们也可以直接在当前文件夹中新建一个.prettierrc的空文件。Prt会自动加载配置文件并应用其中的配置。

同时我们也需要创建.prettierignore 文件,这个文件用来配置Prt在格式化时需要忽略的文件(忽略一些不需要格式化的文件)。例如:
```shell
# Ignore artifacts:

# 忽略build和coverage文件夹下的文件
build
coverage

# Ignore all HTML files:
**/*.html
```
::: warning

By default prettier ignores files in version control systems directories (".git", ".svn" and ".hg") and node_modules (if --with-node-modules CLI option not specified).

默认情况下Prt会忽略版本控制系统目录(".git", ".svn" and ".hg")和node_modules目录(如果没有启用--with-node-modules选项)。

:::

所以即使你没有配置ignore文件，你最终的'.prettierignore'也不会为空，而是像下面这样:


```shell
**/.git
**/.svn
**/.hg
**/node_modules
```


Prettier uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support. This means you can configure Prettier via (in order of precedence):

Prt使用cosmiconfig来提供配置文件支持，这意味着你可以控制配置文件的优先级:

* A "prettier" key in your package.json file. package.json文件中的prettier字段。
* A .prettierrc file written in JSON or YAML. .prettierrc文件
* A .prettierrc.json, .prettierrc.yml, .prettierrc.yaml, or .prettierrc.json5 file.
* A .prettierrc.js, or prettier.config.js file that exports an object using export default or module.exports (depends on the type value in your package.json).
* A .prettierrc.mjs, or prettier.config.mjs file that exports an object using export default.
* A .prettierrc.cjs, or prettier.config.cjs file that exports an object using module.exports.
* A .prettierrc.toml file.

The configuration file will be resolved starting from the location of the file being formatted, and searching up the file tree until a config file is (or isn’t) found.

配置文件将从正在格式化的文件位置开始解析，并向上搜索文件树，直到找到（或找不到）配置文件。

## 执行Prt脚本格式化代码

```shell
npx prettier . --write
```

同时我们可以指定格式化文件的目录:

```shell
prettier --write app/
```

或者指定某个文件:

```shell
prettier --write app/components/Button.js
```

也许你只想检查下代码有没有被Prt格式化过，可以使用--check指令:

```shell
npx prettier . --check
```

## 在编辑器中使用

通过命令行格式化代码会很繁琐，你或许会想到通过node监听或其他方式来检测文件修改并自动执行Prt格式化脚本。但是我们有着更为便捷的方式，当下许多编辑器都对Prt提供了支持，使我们可以在开发代码时快速格式化文件。

[Prt官网](https://www.prettier.cn/docs/editors.html)展示了一些常用编辑器结合Prt的方式。这里我们只简要了解下在vscode中如何使用。

在vscode的扩展中搜索`Prettier - Code formatter`,安装该插件。

插件安装后自动启用，现在我们修改vscode的配置让我们在编辑完文件保存时(ctr + s),触发Prt对文件的格式化。

vscode中顶部菜单栏点击文件-首选项-设置-用户-文本编辑器-格式化。勾选 Format on Save。

理论上打开Prt支持的代码文件保存后将会成功触发格式化,vscode将会自动加载当前目录下的Prt配置文件。对于使用了Ts或安装了Eslint插件的用户，这些工具本身会提供自己的格式化规则，如果如果你的Prt配置没有生效可以在文件用右击，使用...格式化文档-配置默认格式化程序...-Prettier-Code formatter来切换vscode使用的格式化工具。


## 配置

Prt诞生的原因就是受够了其他格式化工具中繁杂的配置选项导致同一项目在不同终端上格式不一的问题，所以Prt的样式配置很少，既然你使用了Prt那么首先就得接受Prt自身的一套规则。

Prt的配置项可以[点此前往官网](https://www.prettier.cn/docs/options.html#vue-files-script-and-style-tags-indentation)查看。


## 文件解析

Prt在运行时会自动根据文件后缀使用对应的解析器，你可以通过配置来帮助Prt来处理它无法理解的文件:

```js
{
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}

//Prt无法理解.prettierrc的文件，所以我们添加该配置让Prt以json格式解析处理.prettierrc文件
```
