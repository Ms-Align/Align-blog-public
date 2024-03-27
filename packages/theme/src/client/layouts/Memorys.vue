<template>
    <Common>
        <template #page>
            <el-card shadow="always" :style="{
                display: authModal?.length ? undefined : 'none', position: 'fixed',
                top: '50%',
                left: '50%',
                'max-width': '480px',
                transform: 'translate(-50%, -50%)',
                'z-index': 99
            }" title="权限校验">
                <div style="display: flex;">
                    <el-input v-model="psdInput" @change="(value) => onAuth(value)" style="width: 240px"
                        placeholder="请校验">
                        <template #prepend>{{ authModal?.[0] || '请校验身份' }}</template>
                    </el-input>
                    <el-button style="margin-left: 16px;" type="danger" @click="authModal = []">取消</el-button>
                </div>
            </el-card>

            <PageHeader :page-info="pageInfo" />
            <audio loop="true" preload="auto" ref="audioRef" autoplay="true" src="/audio/musics/飞向遥远的天空.mpeg">
            </audio>
            <div class="tags-wrapper">
                <el-timeline :style="{ 'padding': isMobile() ? 0 : undefined }">
                    <el-timeline-item type='primary' hollow
                        v-for="(   record, index   ) in (frontmatter?.memorys || [])" :timestamp="record?.date"
                        placement="top">
                        <div v-for="(   memory, index   ) in record?.memory">
                            <el-card>
                                <template #header>
                                    <div class="card-header">
                                        <el-space style="justify-content: space-between;width: 100%;">
                                            <div style="display: flex;">
                                                <el-avatar shape="square" size="small" :src="memory?.avatar" />
                                                <el-button type="primary" style="font-weight: bold;" link>
                                                    {{ memory.owner }}
                                                </el-button>
                                                <el-tag type="primary"
                                                    :style="{ 'margin-left': '16px', display: (memory?.tem || memory?.weather) ? undefined : 'none' }">
                                                    {{ (memory.weather || '') + '•' + (memory.tem || '') }}
                                                </el-tag>
                                            </div>
                                            <div style="display: flex;">
                                                <el-button @click="authModal = memory?.psd || []" type="primary"
                                                    :style="{ 'font-weight': 'bold', display: (!memory?.psd?.length || authedKey.includes(memory?.psd?.[1])) ? 'none' : undefined }"
                                                    link>
                                                    <v-icon name="gi-padlock-open"></v-icon>
                                                </el-button>
                                            </div>
                                        </el-space>
                                    </div>
                                </template>
                                <el-row :gutter="6">
                                    <el-col :span="24">
                                        <el-text v-for="(text, i) in memory?.content?.split(' ')"
                                            style="margin: 4px 0;display: inline-block;" class="mx-1" size="large">
                                            {{ (!memory?.psd?.length || authedKey.includes(memory?.psd?.[1])) ?
                text :
                Array.from({
                    length: text?.length || 10
                }).fill("▇").join(' ') }}
                                        </el-text>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="6" v-if="memory?.img?.length" :style="{ 'padding-top': '16px' }">
                                    <el-col :span="6" v-for="(  src, index  ) in   memory?.img  ">
                                        <el-image style="max-height: 100px;"
                                            :preview-src-list="(!memory?.psd?.length || authedKey.includes(memory?.psd?.[1])) ? [src] : ['/img/avatar.jpg']"
                                            :src="(!memory?.psd?.length || authedKey.includes(memory?.psd?.[1])) ? src : '/ img/avatar.jpg'"
                                            :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :initial-index="4"
                                            fit="cover" />
                                    </el-col>
                                </el-row>
                                <template #footer>
                                    <div class="card-header">
                                        <el-button type="info" link>
                                            <v-icon name="md-avtimer-twotone">
                                            </v-icon>
                                            {{ memory.time }}
                                        </el-button>
                                        <el-button type="info" link>
                                            <v-icon name="co-location-pin">
                                            </v-icon>
                                            {{ memory.location?.join(' • ')}}
                                        </el-button>
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
const authModal = ref([])
const psdInput = ref(null)
//已经校验过的值
const authedKey = ref([])
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

const toggleMusic = () => {
    (audioRef.value as any).play()
}
const onAuth = (input: any) => {
    //输入值和密码相等时
    if (authModal?.value?.[1] == input) {
        authedKey.value.push(input)
        authModal.value = []
    }
}
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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