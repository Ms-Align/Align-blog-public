import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { defineUserConfig } from "vuepress";
import giscusPlugin from "vuepress-plugin-giscus";
import { gungnirTheme, i18n } from "vuepress-theme-gungnir";
import { navbar, sidebar } from "./configs";

// const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig({
  base: "/",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16.png`,
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo/favicon-32x32.png`,
      },
    ],
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["meta", { name: "application-name", content: "Gungnir Theme" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Gungnir Theme" }],
    [
      "meta",
      {
        "http-equiv": "Content-Security-Policy",
        content: "upgrade-insecure-requests",
      },
    ],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/img/logo/apple-touch-icon.png` },
    ],
    ["meta", { name: "theme-color", content: "#377bb5" }],
    ["meta", { name: "baidu-site-verification", content: "codeva-vBshr0k65G" }],
    ["meta", { name: "msapplication-TileColor", content: "#377bb5" }],
  ],

  // site-level locales config
  locales: {
    "/": {
      lang: "en-US",
      title: "VuePress Theme Gungnir",
      description: "A blog theme for VuePress",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "VuePress Theme Gungnir",
      description: "VuePress 博客主题",
    },
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === "webpack"
      ? webpackBundler()
      : viteBundler({
          viteOptions: { build: { chunkSizeWarningLimit: 5000 } },
        }),

  // configure default theme
  theme: gungnirTheme({
    repo: null,
    // repo: "Ms-Align/Align-blog-public",
    docsDir: "docs",
    navbarTitle: "Align",

    // hitokoto: "http://124.223.165.180:2120/hitokoto", // enable hitokoto (一言) or not?
    hitokoto: "https://v1.hitokoto.cn?c=i", // enable hitokoto (一言) or not?

    // personal information
    personalInfo: {
      name: "Align",
      avatar: "/img/avatar.jpg",
      description: "你说青涩最搭初恋，如小雪落下海岸线",
      sns: {
        gitee: {
          icon: "si-gitee",
          link: "https://gitee.com/aligns",
        },
        github: "Ms-Align",
        // linkedin: "/",
        // facebook: "/",
        // twitter: "/",
        // zhihu: "/",
        email: {
          icon: "fa-envelope",
          text: true,
          link: "1739174050@qq.com",
        },
        // rss: "/rss.xml",
        // customized sns
        // bilibili: {
        //   icon: "ri-bilibili-line",
        //   link: "/",
        // },
      },
    },

    // header images on home page
    homeHeaderImages: [
      {
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)",
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgb(251, 170, 152, .2)",
      },
      {
        path: "/img/home-bg/3.jpg",
        mask: "rgba(68, 74, 83, .1)",
      },
      {
        path: "/img/home-bg/4.jpg",
        mask: "rgba(19, 75, 50, .2)",
      },
    ],

    // other pages
    pages: {
      tags: {
        subtitle: "Black Sheep Wall",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .5)",
        },
      },
      links: {
        subtitle: "开源项目，文档导航，通过以下连接快速前往",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.5)",
        },
      },
      memorys: {
        subtitle: "飞向遥远的天空",
        bgImage: {
          path: "/img/pages/memorys.jpg",
          mask: "rgba(64, 118, 190, 0.5)",
        },
      },
    },

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale is English, we don't need to set all of the locale fields
       */
      "/": {
        // navbar
        navbar: navbar.en,
        // sidebar
        sidebar: sidebar.en,
      },

      /**
       * Chinese locale config
       */
      "/zh/": {
        // navbar
        navbar: navbar.zh,
        // sidebar
        sidebar: sidebar.zh,
        // i18n
        ...i18n.zh,
      },
    },

    // themePlugins: {
    //   // only enable git plugin in production mode
    //   git: isProd,
    //   katex: true,
    //   mermaid: true,
    //   chartjs: true,
    //   giscus: {
    //     repo: "This-is-an-Apple/gitalk-comments",
    //     repoId: "MDEwOlJlcG9zaXRvcnkyMTA1MjQyMTQ=",
    //     category: "Announcements",
    //     categoryId: "DIC_kwDODIxYNs4CAO1u",
    //     lazyLoad: true
    //   },
    //   mdPlus: {
    //     all: true
    //   },
    //   ga: "G-EE8M2S3MPB",
    //   ba: "10b7bc420625758a319d6b23aed4700f",
    //   rss: {
    //     siteURL: "https://v2.vuepress-theme-gungnir.vercel.app",
    //     copyright: "Renovamen 2018-2022"
    //   },
    //   pwa: true,
    //   search: false // use @vuepress/plugin-docsearch instead
    // },

    footer: `
      &copy; <a href="https://github.com/Ms-Align" target="_blank">Align</a> 2024-2025
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a>
    `,
  }),

  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  },

  plugins: [
    giscusPlugin({
      repo: "Ms-Align/Align-discussions",
      repoId: "R_kgDOLsMRVA",
      category: "Announcements",
      categoryId: "DIC_kwDOLsMRVM4CeliV",
      mapping: "pathname",
      reactionsEnabled: true,
      theme: "preferred_color_scheme",
      lang: "zh-CN",
      lazyLoad: true,
      crossorigin: "anonymous",
    }),
    docsearchPlugin({
      appId: "3DDLGP0IG4",
      apiKey: "6556adaa82b31485309b440a525f264a",
      indexName: "v2-vuepress-theme-gungnir",
      locales: {
        "/zh/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
  ],
});
