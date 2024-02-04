<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-gungnir-content">
      <slot name=" content-top" />

      <el-result v-if="hideContent" icon="warning" title="文章可能涉及真实人物姓名或其它敏感信息,作者已对其加密"
        :sub-title="`您需要通过回答下列问题进行权限校验，或者通过联系文章作者${frontmatter?.auth[2] || ''}获得校验密码。`">
        <template #extra>
          <ContentAuth :open="true" @onSuccess="onAuthSuccess" @onCancel="onBack" />
        </template>
      </el-result>
      <Content v-else />

      <slot name="content-bottom" />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />

    <GungnirGiscus v-if="frontmatter.giscus !== false" :theme="giscusTheme" />
  </main>
</template>

<script setup lang="ts">
import PageMeta from "@theme/PageMeta.vue";
import PageNav from "@theme/PageNav.vue";
import { usePageFrontmatter } from "@vuepress/client";
import { computed, ref } from "vue";
import type { GungnirThemeNormalPageFrontmatter } from "../../shared";
import { useDarkMode, useThemeLocaleData } from "../composables";
import ContentAuth from './ContentAuth.vue'
const themeLocale = useThemeLocaleData();
const frontmatter = usePageFrontmatter<GungnirThemeNormalPageFrontmatter>();
const { isDarkMode } = useDarkMode();
const hideContent = ref(frontmatter.value?.auth?.length)
const onAuthSuccess = () => {
  hideContent.value = false
}
const onBack = () => {
  window.history.back()
}
const giscusTheme = computed(() =>
  isDarkMode.value
    ? themeLocale.value.giscusDarkTheme
    : themeLocale.value.giscusLightTheme
);
</script>
