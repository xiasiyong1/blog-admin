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
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="验证码" prop="code" class="flex">
            <el-input v-model="form.code" class="!w-[120px]" />
            <el-button
              class="ml-2"
              type="primary"
              @click="getCode"
              :disabled="codeStatus === CodeStatusEnum.SEND"
              >{{ codeStatusText }}</el-button
            >
          </el-form-item>
          <el-form-item label="密码" :rules="rules.password" prop="password"
            ><el-input v-model="form.password" />
          </el-form-item>
          <el-form-item label="确认密码" :rules="rules.password1" prop="password1"
            ><el-input v-model="form.password1" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">注册</el-button>
          </el-form-item>
          <el-form-item>
            <div>
              已经有账号了？
              <router-link replace to="/signin" class="text-[var(--el-color-primary)]"
                >登录</router-link
              >
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { signUpWithEmail } from '@/apis/auth'
import emailApi from '@/apis/email'
import { CodeStatusEnum } from '@/enums/code'
const DEFAULT_EXPIRE_TIME = 5 * 60

const router = useRouter()

const codeStatus = ref(CodeStatusEnum.UN_SEND)
const codeExpireTime = ref(DEFAULT_EXPIRE_TIME)

const codeStatusText = computed(() => {
  switch (codeStatus.value) {
    case CodeStatusEnum.SEND:
      return codeExpireTime.value + '秒后重新发送'
    case CodeStatusEnum.EXPIRED:
      return '重新发送'
    default:
      return '发送验证码'
  }
})

const formRef = ref<FormInstance>()

const form = reactive({
  email: '',
  password: '',
  password1: '',
  code: ''
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
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, required: true, message: '请输入6位验证码', trigger: 'blur' }
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
      signUpWithEmail({
        email: form.email,
        password: form.password,
        code: form.code
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

const startCountDown = () => {
  let timer: any = null
  timer = setInterval(() => {
    codeExpireTime.value--
    if (codeExpireTime.value <= 0) {
      codeStatus.value = CodeStatusEnum.EXPIRED
      codeExpireTime.value = DEFAULT_EXPIRE_TIME
      clearInterval(timer)
    }
  }, 1000)
}

const getCode = () => {
  if (!formRef.value) return
  formRef.value?.validateField('email').then(() => {
    emailApi.getCode({ email: form.email }).then(() => {
      codeStatus.value = CodeStatusEnum.SEND
      startCountDown()
    })
  })
}
</script>

<style></style>
