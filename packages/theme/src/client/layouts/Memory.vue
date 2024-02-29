<template>
    <Common>
        <template #page>
            <PageHeader :page-info="pageInfo" />
            <div>内嵌iframe开发</div>
        </template>
    </Common>
</template>
  
<script setup lang="ts">
import Common from "@theme/Common.vue";
import PageHeader from "@theme/PageHeader.vue";
import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import type {
    GungnirThemeLinksPageFrontmatter,
    GungnirThemePageOptions
} from "../../shared";
import { useThemeLocaleData } from "../composables";

const themeLocale = useThemeLocaleData();
const frontmatter = usePageFrontmatter<GungnirThemeLinksPageFrontmatter>();

const pageInfo = computed(() => {
    const info = (
        themeLocale.value.pages && themeLocale.value.pages.links
            ? themeLocale.value.pages.links
            : {}
    ) as GungnirThemePageOptions;
    if (info.title === undefined) info.title = themeLocale.value.pageText?.links;
    return info;
});
</script>
  