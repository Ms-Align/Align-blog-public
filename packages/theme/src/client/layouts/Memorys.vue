<template>
    <Common>
        <template #page>
            <PageHeader :page-info="pageInfo" />
            <div class="tags-wrapper">
                <iframe style="border: none;width: 100%;" src="http://124.223.165.180/blog/memorys"></iframe>
            </div>
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
        themeLocale.value.pages && themeLocale.value.pages.memorys
            ? themeLocale.value.pages.memorys
            : {}
    ) as GungnirThemePageOptions;
    if (info.title === undefined) info.title = themeLocale.value.pageText?.memorys;
    return info;
});
</script>
  