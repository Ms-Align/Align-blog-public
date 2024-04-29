import { defineClientConfig } from "@vuepress/client";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
  BiLayoutSidebarInset,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaCircle,
  FaEnvelope,
  FaFacebookF,
  FaGithubAlt,
  FaLinkedinIn,
  SiYoutubemusic,
  FaListUl,
  FaMagic,
  FaMoon,
  CoLocationPin,
  FaPencilAlt,
  FaRegularCalendar,
  MdAvtimerTwotone,
  FaRegularUser,
  IoTimerSharp,
  FaSun,
  FaTwitter,
  HiTranslate,
  RiRssFill,
  LaUnlockAltSolid,
  MdSharelocation,
  RiSearch2Line,
  SiGitee,
  GiPadlockOpen,
  RiPauseCircleFill,
  RiTimerLine,
  BiPostcardHeartFill,
  RiWeiboFill,
  RiZhihuLine
} from "oh-vue-icons/icons";
import { h } from "vue";
import type { DefineComponent } from "vue";
import { Badge, CodeGroup, CodeGroupItem, LinkCard } from "./components/global";
import {
  setupBlogPages,
  setupDarkMode,
  setupDynamicStyle,
  setupSidebarItems,
  setupTagMap,
  useScrollPromise
} from "./composables";

import "./styles/index.scss";

addIcons(
  FaChevronDown,
  FaChevronUp,
  CoLocationPin,
  MdSharelocation,
  MdAvtimerTwotone,
  FaChevronLeft,
  BiPostcardHeartFill,
  GiPadlockOpen,
  SiYoutubemusic,
  LaUnlockAltSolid,
  FaChevronRight,
  FaMagic,
  SiGitee,
  FaSun,
  FaMoon,
  FaGithubAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  RiZhihuLine,
  RiWeiboFill,
  FaEnvelope,
  RiRssFill,
  FaCircle,
  FaPencilAlt,
  FaRegularUser,
  FaRegularCalendar,
  RiTimerLine,
  RiPauseCircleFill,
  FaListUl,
  BiLayoutSidebarInset,
  HiTranslate,
  RiSearch2Line
);

export default defineClientConfig({
  enhance({ app, router }) {
    app.component("Badge", Badge);
    app.component("CodeGroup", CodeGroup);
    app.component("CodeGroupItem", CodeGroupItem);

    // icons
    app.component("VIcon", OhVueIcon);

    // link card
    app.component("LinkCard", LinkCard);
    
    app.use(ElementPlus)

    // built-in SearchPage component
    app.component("GungnirSearchPage", () => {
      const SearchPage = app.component("SearchPage");
      return SearchPage ? h(SearchPage) : null;
    });

    // Giscus
    app.component("GungnirGiscus", (props: { theme?: string }) => {
      const Giscus = app.component("Giscus") as DefineComponent;
      return Giscus ? h(Giscus, { theme: props.theme }) : null;
    });

    // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
    app.component("NavbarSearch", () => {
      const SearchComponent =
        app.component("Docsearch") || app.component("SearchBox");
      if (SearchComponent) {
        return h(SearchComponent);
      }
      return null;
    });

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
  },

  setup() {
    setupDynamicStyle();
    setupDarkMode();
    setupSidebarItems();
    setupBlogPages();
    setupTagMap();
  }
});
