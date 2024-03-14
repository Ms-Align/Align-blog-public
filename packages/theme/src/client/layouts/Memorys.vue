<template>
    <Common>
        <template #page>
            <PageHeader :page-info="pageInfo" />
            <audio loop="true" preload="auto" ref="audioRef" autoplay="true"
                src="https://124.223.165.180/api/static/musics/376db03817986dd1bae7f5f206340fb9.mpeg">
            </audio>
            <div class="tags-wrapper">
                <el-timeline>
                    <el-timeline-item type='primary' hollow v-for="( record, index ) in  (frontmatter?.memorys || []) "
                        :timestamp="record?.date" placement="top">
                        <div v-for="( memory, index ) in  record?.memory ">
                            <el-card>
                                <template #header>
                                    <div class="card-header">
                                        <el-space>
                                            <el-avatar shape="square" size="small" :src="memory?.avatar" />
                                            <el-button type="primary" style="font-weight: bold;" link>
                                                {{ memory.owner }}
                                            </el-button>
                                        </el-space>
                                    </div>
                                </template>
                                <el-row :gutter="6">
                                    <el-col :span="24">
                                        <el-text style="margin: 16px 0;" class="mx-1" size="large">
                                            {{ memory.content }}
                                        </el-text>
                                    </el-col>
                                </el-row>
                                <el-row style="padding-top: 16px;" :gutter="6" v-if="memory?.img?.length">
                                    <el-col :span="6" v-for="( src, index ) in  memory?.img ">
                                        <el-image :preview-src-list="memory?.img" :src="src" :zoom-rate="1.2"
                                            :max-scale="7" :min-scale="0.2" :initial-index="4" fit="cover" />
                                    </el-col>
                                </el-row>

                                <template #footer>
                                    <div class="card-header">
                                        <el-text class="mx-1" type="info" size="large">
                                            {{ memory.time }}
                                        </el-text>
                                    </div>
                                </template>
                            </el-card>
                            <el-divider>
                                <v-icon fill="rgb(156, 205, 255)" name="bi-postcard-heart-fill" animation="pulse" />
                            </el-divider>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </template>
    </Common>
</template>

<script setup lang="ts">
import Common from "@theme/Common.vue";
import PageHeader from "@theme/PageHeader.vue";
import { usePageFrontmatter } from "@vuepress/client";
//import { TK } from '../../../public/tk';
import { computed, ref, onMounted } from "vue";
import type {
    GungnirThemeLinksPageFrontmatter,
    GungnirThemePageOptions
} from "../../shared";
import { ElMessage, ElMessageBox } from 'element-plus'
import { useThemeLocaleData } from "../composables";
const themeLocale = useThemeLocaleData();
const audioRef = ref(null)
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

const toggleMusic = (done: () => void) => {
    (audioRef.value as any).play()
}
document.body.addEventListener('click', function () {
    // 在此处编写滚动时需要执行的代码
    toggleMusic()
});
// ElMessageBox.alert('我们为Memory提供了背景音乐，希望你喜欢。', 'Align', {
//     // if you want to disable its autofocus
//     // autofocus: false,
//     confirmButtonText: '开始吧！',
//     callback: (action: any) => {
//         (audioRef.value as any).play()
//     },
// })

</script>