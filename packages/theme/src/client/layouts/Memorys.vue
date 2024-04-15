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
            <!-- <div class="sorter-wrapper">
                <el-form :model="formInline" class="demo-form-inline">
                    <el-form-item label="发布时间">
                        <el-select v-model="formInline.TIME" clearable>
                            <el-option label="由近及远" value="desc" />
                            <el-option label="由远及近" value="asc" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容字数">
                        <el-select v-model="formInline.WORDS" clearable>
                            <el-option label="由多到少" value="desc" />
                            <el-option label="由少到多" value="asc" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否权限校验">
                        <el-select v-model="formInline.AUTH" clearable>
                            <el-option label="无需校验" :value="false" />
                            <el-option label="需要校验" :value="true" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布者">
                        <el-select v-model="formInline.USER" clearable>
                            <el-option label="Align" value="Align" />
                            <el-option label="梦亦同趋" value="梦亦同趋" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
            <div class="tags-wrapper">
                <div class="link-section" style="padding-bottom: 16px;margin: 0 24px;width:100%">
                    <h2>添加过滤条件</h2>
                    <div style="margin-left: 16px;display:flex;align-items:center">
                        <el-tag effect="dark" style="margin: 0 8px;" round v-for="tag in dynamicTags" :key="tag.value"
                            closable :disable-transitions="false" @close="handleClose(tag)">
                            {{ tag.label  }}
                        </el-tag>
                        <el-tree-select placeholder='选择条件' @change="handleInputConfirm" v-if="inputVisible" :data="options" v-model="formInline" clearable>
                                </el-tree-select>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">
                            + 添加条件
                        </el-button>
                    </div>
                </div>

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
                                    <el-col style="flex: none;" v-for="(  src, index  ) in   memory?.img  ">
                                        <el-image style="height: 100px;width: 100px;"
                                            :preview-src-list="(!memory?.psd?.length || authedKey.includes(memory?.psd?.[1])) ? [src] : ['/img/avatar.jpg']"
                                            :src="(!memory?.psd?.length || authedKey.includes(memory?.psd?.[1])) ? src : '/img/avatar.jpg'"
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
import * as dayjs from 'dayjs'
import { computed, ref, onMounted, reactive, nextTick,watchEffect } from "vue";
import type {
    GungnirThemeLinksPageFrontmatter,
    GungnirThemePageOptions,
    MemoryGroup
} from "../../shared";
import { ElMessage, ElMessageBox } from 'element-plus'
import { useThemeLocaleData } from "../composables";
const themeLocale = useThemeLocaleData();
const audioRef = ref(null)
const authModal = ref([])
const psdInput = ref(null)
//已经校验过的值
const authedKey = ref([])
const inputValue = ref('')
const dynamicTags = ref<any[]>([])
const inputVisible = ref(false)
const InputRef = ref()
const options = [
                {
                    value: 'TIME',
                    label: '发布时间',
                    children: [
                        {
                            value: 'TIME_desc_时间：由近及远',
                            label: '由近及远',
                        },{
                            value: 'TIME_asc_时间：由远及近',
                            label: '由远及近',
                        },
                    ],
                },
                {
                    value: 'WORDS',
                    label: '内容字数',
                    children: [
                        {
                            value: 'WORDS_desc_内容字数：由多及少',
                            label: '由多及少',
                        },{
                            value: 'WORDS_asc_内容字数：由少及多',
                            label: '由少及多',
                        },
                    ],
                },
            ]
const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
type FilterRule = 'TIME' | "WORDS" | "USER" | "AUTH"
type FilterType = "asc" | "desc" | "none"
interface FilterResultStackItem {
    rule?: FilterRule
    type?: FilterType
    source: MemoryGroup[]
    result?: MemoryGroup[]
}
class FilterMemoryBy {
    filterResultStack: Array<FilterResultStackItem> = []

    get current(): FilterResultStackItem {
        return this.filterResultStack.slice(-1)?.[0]
    }
    constructor(memorys: MemoryGroup[]) {
        this.filterResultStack.push({ source: memorys })
    }

    filter(rule: FilterRule, type: FilterType = 'desc') {
        const _source = this.current?.result || this.current?.source
        this.filterResultStack.push({ source: _source, type, rule })
        switch (rule) {
            case 'TIME':
                this.filterByTime()
                break;
            case 'WORDS':
                this.filterByWords()
                break;
            case 'AUTH':
                this.filterByAuth()
                break;
            case 'USER':
                this.filterByUser()
                break
            default:
                this.filterByTime()
                break;
        }
        return JSON.parse(JSON.stringify(this.current?.result || '[]'))

    }

    //按时间顺序排序
    filterByTime() {
        let _source = JSON.parse(JSON.stringify(this.current?.result || this.current?.source || '[]')), _type = this.current?.type
        if (_type == 'asc') {
            _source.forEach(element => {
                element.memory = element.memory?.sort((a, b) => { return dayjs(a.time).isBefore(dayjs(b?.time)) ? -1 : 1 })
            });
            _source = _source?.sort((a, b) => { return dayjs(a.date).isBefore(dayjs(b?.date)) ? -1 : 1 })
        } else {
            _source.forEach(element => {
                element.memory = element.memory?.sort((a, b) => { return dayjs(a.time).isBefore(dayjs(b?.time)) ? 1 : -1 })
            });
            _source = _source?.sort((a, b) => { return dayjs(a.date).isBefore(dayjs(b?.date)) ? 1 : -1 })
        }
        this.current.result = _source
    }
    //按字数顺序排序
    filterByWords() {
        let _source = JSON.parse(JSON.stringify(this.current?.result || this.current?.source || '[]')), _type = this.current?.type
        let source: any = [];
        if (_type == 'asc') {
            //将每个memory抽离成一个单独的group
            _source.forEach(item => {
                item?.memory?.forEach((memory) => {
                    source.push({
                        ...item,
                        memory: [memory]
                    })
                })
            })
            //按字数多少排序
            this.current.result = source.sort((a, b) => {
                return a.memory?.[0]?.content?.length - b.memory?.[0]?.content?.length
            })
        } else {
            //将每个memory抽离成一个单独的group
            _source.forEach(item => {
                item?.memory?.forEach((memory) => {
                    source.push({
                        ...item,
                        memory: [memory]
                    })
                })
            })
            //按字数多少排序
            this.current.result = source.sort((a, b) => {
                return b.memory?.[0]?.content?.length - a.memory?.[0]?.content?.length
            })
        }
    }
    filterByAuth() {
        let _source = JSON.parse(JSON.stringify(this.current?.result || this.current?.source || '[]')), _type = this.current?.type
        if (_type == 'none') {

        }
    }
    filterByUser() {
        let _source = JSON.parse(JSON.stringify(this.current?.result || this.current?.source || '[]')), _type = this.current?.type
    }
}
const showInput = () => {
    inputVisible.value = true
}
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
const formInline = ref()
watchEffect(()=>{
    console.log(2120)
    const filter = new FilterMemoryBy(frontmatter.value.memorys || [])
    dynamicTags?.value.forEach(tag=>{
        const [rule,type] = tag?.value?.split('_')
        frontmatter.value.memorys = filter.filter(rule,type)
    })
    
})
const handleInputConfirm = (value) => {
    inputVisible.value = false
    dynamicTags.value=[...dynamicTags.value,{
        label:value?.split('_')[2],
        value
    }]
    nextTick(()=>{
        formInline.value = undefined
    })
}
// const filterTarget = ref('TIME')
// const filterOptions = [{ label: '时间', value: "TIME" }, { label: '字数', value: "WORDS" },]


// const onSubmit = () => {
//     console.log('submit!')
// }


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

<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>