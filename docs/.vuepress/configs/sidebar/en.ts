import type { SidebarConfig } from "vuepress-theme-gungnir";

export const en: SidebarConfig = {
  "/docs/": [
    {
      text: "Basic",
      children: [
        "/docs/basic/intro.md",
        "/docs/basic/installation.md",
        "/docs/basic/config.md",
        "/docs/basic/search.md",
        "/docs/basic/content.md"
      ]
    },
    {
      text: "Advanced",
      children: [
        "/docs/advanced/comment.md",
        "/docs/advanced/analytics.md",
        "/docs/advanced/reading-time.md",
        "/docs/advanced/rss.md",
        "/docs/advanced/hitokoto.md",
        "/docs/advanced/icons.md"
      ]
    },
    {
      text: "Markdown Enhancements",
      children: [
        "/docs/md-enhance/math.md",
        "/docs/md-enhance/chart.md",
        "/docs/md-enhance/mermaid.md",
        "/docs/md-enhance/others.md"
      ]
    },
    {
      text: "Plugins",
      children: [
        "/docs/plugins/intro.md",
        "/docs/plugins/giscus.md",
        "/docs/plugins/chart.md",
        "/docs/plugins/mermaid.md",
        "/docs/plugins/katex.md",
        "/docs/plugins/reading-time.md",
        "/docs/plugins/baidu-tongji.md",
        "/docs/plugins/md-plus.md",
        "/docs/plugins/rss.md"
      ]
    }
  ],
  "/posts/": [
    {
      text: "Intro",
      children: ["/posts/readme.md"]
    },
    {
      text: "yjs.js",
      children: [
        "/posts/documents/yjs.js/基础概念.md",
        "/posts/documents/yjs.js/网络同步.md",
        "/posts/documents/yjs.js/Y.Doc.md",
        "/posts/documents/yjs.js/Shared Types.md",
        "/posts/documents/yjs.js/Delta Format.md",
        "/posts/documents/yjs.js/Y.Event.md",
        "/posts/documents/yjs.js/Y.UndoManager.md",
        "/posts/documents/yjs.js/Document Updates.md",
        "/posts/documents/yjs.js/y-protocol源码学习.md",
        "/posts/documents/yjs.js/y-websocket源码学习.md"
      ]
    },
    {
      text: "react-dnd",
      children: [
        "/posts/documents/reactDnd/介绍.md",
        "/posts/documents/reactDnd/概览.md",
        "/posts/documents/reactDnd/组件.md",
        "/posts/documents/reactDnd/hooks.md",
        "/posts/documents/reactDnd/Monitoring State.md",
        "/posts/documents/reactDnd/backend.md"
      ]
    },
    {
      text: "MUI Systom",
      children: [
        "/posts/documents/MUI System/起步.md",
        "/posts/documents/MUI System/用法.md",
        "/posts/documents/MUI System/The sx prop.md"
      ]
    }
  ]
};
