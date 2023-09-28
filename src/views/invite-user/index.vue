<template>
  <el-row class="flex items-center justify-center h-[100vh]">
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>注册</span>
          </div>
        </template>
        <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" disabled name="email" />
          </el-form-item>
          <el-form-item label="密码" :rules="rules.password" prop="password"
            ><el-input v-model="form.password" type="password" name="password" show-password />
          </el-form-item>
          <el-form-item label="确认密码" :rules="rules.password1" prop="password1"
            ><el-input v-model="form.password1" type="password" name="password1" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">加入</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import * as authApi from '@/apis/auth'

const router = useRouter()
const route = useRoute()
const code = route.query.code

const formRef = ref<FormInstance>()

const form = reactive({
  email: '',
  password: '',
  password1: ''
})
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
  ],
  password1: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请重新确认密码'))
        } else if (value !== form.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
      required: true
    }
  ]
})
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      authApi
        .signUpWithCode({
          email: form.email,
          password: form.password,
          code: code as string
        })
        .then(() => {
          router.replace('/signin?email=' + form.email)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('error submit!')
    }
  })
}

const getInviteInfo = () => {
  if (code) {
    authApi.getInviteCodeInfo(code as string).then((res) => {
      form.email = res.data.data.email
    })
  }
}

onMounted(() => {
  getInviteInfo()
})
</script>

<style></style>
