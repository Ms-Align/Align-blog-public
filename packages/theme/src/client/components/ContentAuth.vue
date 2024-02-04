<template>
    <div>
        <el-form :rules="rules" :model="form" ref="formInstance">
            <el-form-item :label="frontmatter.auth?.[0]" prop="auth" required>
                <el-input v-model="form.auth" autocomplete="off" />
            </el-form-item>
            <div style="text-align: center;">
                <el-button type="primary" @click="onAuthPsd">
                    校验
                </el-button>
                <el-button type="primary" @click="emit('onCancel')">
                    返回
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from "vue";
import { ElMessage } from 'element-plus'
import { usePageFrontmatter } from "@vuepress/client";
import type { GungnirThemeNormalPageFrontmatter } from "../../shared";
import type { FormInstance, FormRules } from 'element-plus'
const frontmatter = usePageFrontmatter<GungnirThemeNormalPageFrontmatter>();
const form = ref<any>({})
const formInstance = ref<any>({})
const props = defineProps(['open'])
const emit = defineEmits(['onSuccess', 'onCancel'])
const rules = reactive<FormRules<any>>({
    auth: [{ required: true, message: '请输入校验信息' }]
})
const onAuthPsd = () => {
    formInstance.value?.validate()?.then(() => {
        //校验密码
        if (frontmatter.value.auth[1] == form.value.auth) {
            emit('onSuccess')
        } else {
            throw new Error('校验失败')
        }
    }).catch(err => {
        if (err && err.message) {
            ElMessage.error(err.message)
        }

    })

}
</script>