<template>
  <el-row class="flex items-center justify-center h-[100vh]">
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>登录</span>
          </div>
        </template>
        <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="密码" prop="password"
            ><el-input v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">登录</el-button>
          </el-form-item>
          <el-form-item>
            <div>
              还没有账号？
              <router-link to="/signup" replace class="text-[var(--el-color-primary)]"
                >注册</router-link
              >
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { signInWithEmail } from '@/apis/auth'
import type { FormInstance, FormRules } from 'element-plus'
import { setAccessToken } from '@/helpers/localstorge'

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: route.query.email as string,
  password: ''
})

const formRef = ref<FormInstance>()

const rules = reactive<FormRules<typeof form>>({
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      required: true,
      message: '请输入正确格式的邮箱',
      trigger: ['blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      signInWithEmail({
        email: form.email,
        password: form.password
      })
        .then((res) => {
          setAccessToken(res.data.data.access_token)
          router.replace('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style></style>
