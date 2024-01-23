---
layout: Post
title: 【webpack】相对路径下前端项目打包发布
subtitle: 源于一次失败的项目部署
author: Align
date: 2023-10-27
headerImage: /img/in-post/covers/webpack相对路径打包发布.png
tags:
  - 前端
  - react
  - webpack
---

我这里部署的项目就是我上一篇《手动搭建一个React开发环境》中构建的项目。今天尝试部署包到腾讯云时遇到了一些问题。

<!-- more -->

## 修改nginx配置

这个服务器的根路径下已经部署了一个项目，这次部署的项目是作为给其他应用嵌入的独立项目，所以打算部署在/a/b路径下。

直接copy下原有的路径配置修改:


```shell
location /a/b/ {
	    root  html;
      index  /a/b/index.html;
      try_files $uri $uri/ /a/b/index.html;
	}

```

多提一嘴，对于使用了history路由的单页面应用需要配置上述的try_files，让nginx在找不到对应路径资源时加载入口文件。

## 打包部署

在nginx中创建好对应项目的目录然后把包文件上传进去就行了。随后通过/a/b访问项目。

结果页面渲染出了个:

**Unexpected Application Error!**

**404 Not Found**

打开控制台查看，没有报错，资源也加载正常。为了确认是react的报错我复制Unexpected Application Error!在打包文件里搜索了以下发现能搜索到，这确实是前端react的报错。

这种没有任何关键信息的提示语我感觉会很难排查，果然百度和gpt也对"react的Unexpected Application Error!报错"给不出关联性较强的解答。

我隐约感觉是路由的问题，但是想不到那里会出问题，因为我的nginx配置的没问题，上一个项目也是这么部署的。

于是我尝试将项目的路由模式改为hash模式，部署到服务器上后项目正常了。看着配置的路由文件我突然意识到单页面应用是在内部判断url匹配要渲染的页面的，我的项目运行时react找不到路径为/a/b的路径。


## 使用history路由

### 修改react路由配置
其实上一步我们的问题已经有了解决方案，使用hash路由(如果你和用户愿意忍受'#'的话)。

因为我们的项目是基于/a/b部署的，所以我们的react路由需要基于这个路径解析,修改我们的createBrowserRouter函数:

```js
const router = createBrowserRouter(
  routes,
  process.env.NODE_ENV == "production"
    ? { basename: "/a/b/" }
    : undefined,
)
```

通过配置basename属性来设置一个基础路径，这样生产环境react路由就能正确解析我们的url(react-router v6)。同时我们通过判断运行环境来只在生产环境下设置basename，这样我们的开发环境还是正常的。

### 修改webpack配置

修改了路由配置只是让我们的项目运行时正常了，我们还需要修改webpack的打包配置以便项目能正确加载资源。

修改webpack.prod.js的output选项:

```js
output: {
    publicPath: "/a/b/"
  }
```
现在加载的所有相对路径资源都会基于该publicPath(当然因为最终打包的路径都是相对的，我这里加不加都可以)。


现在重新打包发布，项目可以在/a/b下正常加载。


## 开发环境下基于相对路径启动项目

如果你在开发环境下也想基于类似/a/b的路径启动项目,需要修改如下配置；

* `createBrowserRouter` 中配置basename
* 修改webpack.dev.js文件下output的publicPath为/a/b,这样会将你的打包结果托管到本地服务器的/a/b路径下。
* 修改webpack.dev.js的historyApiFallback的配置：

```js
historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: "/a/b/",
        },
      ],
    },
```

官网的解释是开启该属性会将本地服务器所有的404响应返回项目入口文件。这里我们的入口文件地址是基于/a/b路径的，所以要配置入口文件的路径。

现在我们可以在/a/b的路径下调试项目了。
