import type { NavbarConfig } from "vuepress-theme-gungnir";

export const zh: NavbarConfig = [
  {
    text: "首页",
    link: "/",
    icon: "fa-fort-awesome",
  },
  {
    text: "记忆",
    link: "/memorys/",
    icon: "ri-heart-pulse-fill",
  },
  {
    text: "标签",
    link: "/tags/",
    icon: "fa-tag",
  },
  {
    text: "链接",
    link: "/links/",
    icon: "fa-satellite-dish",
  },
  {
    text: "文档",
    link: "/zh/posts/readme.md",
    icon: "ri-article-line",
  },
  {
    text: "开发文档",
    link: "/zh/docs/basic/intro.md",
    icon: "ri-book-2-fill",
  },
  {
    text: "VuePress",
    link: "https://v2.vuepress.vuejs.org/zh/",
    icon: "ri-vuejs-line",
  },
];
