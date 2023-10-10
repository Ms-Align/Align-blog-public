---
layout: Post
title: Docker 快速指南
subtitle: Docker常用指令及相关概念等
author: Align
date: 2023-09-28
headerImage: /img/in-post/2021-12-24/header.jpg
tags:
  - 前端
  - Docker
---


公司使用到了docker，花了点时间稍微入门了一下。

<!-- more -->


## 快速查看

*常用的dockerfile指令*

* **FROM**
  * FROM 指令用于设置在新映像创建过程期间将使用的容器映像。Docker hub提供了许多现有镜像，我们一般基于这些现有的镜像构建而不是从零构建镜像。
* **RUN**
  *  该指令指定运行在镜像中的指令，例如在node镜像中你需要安装项目依赖可以执行`RUN npm install`或者`RUN ['npm','install']`。
* **COPY**
  * 类似于linux的复制语法，复制指定文件/目录到指定文件/目录下。eg.`COPY nginx.conf /etc/nginx/nginx.conf`。如果路径存在空格可以使用上面实例中数组的写法。
* **ADD**
  * ADD 指令与 COPY 指令非常类似，但它包含更多功能。除了将文件从主机复制到容器映像，ADD 指令还可以使用 URL 规范从远程位置复制文件。eg.`ADD<url> <destination>`
* **WORKDIR**
  * 设置工作目录，如果不存在则会创建，哪怕创建完成后没有执行任何指令。
* **CMD**
  * 该指令可以用于指定容器被启动时需要运行的命令
* **EXPOSE**
  * 指定容器环境需要暴露给外界使用的端口。注意这里的端口只是一种文本性描述，用来提示/建议开发者使用该镜像时监听的端口，写或不写并不会影响代码的执行。
* **ENTRYPOINT**
  * 该指令可以用于指定容器被启动后需要运行的命令
* **ENV**
  * ENV命令用于设置环境变量。这些变量以”key=value”的形式存在，并可以在容器内被脚本或者程序调用。`ENV VERSION=1.0 DEBUG=on \`
