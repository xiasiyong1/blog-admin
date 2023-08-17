<template>
  <el-row class="flex items-center justify-center h-[100vh]">
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>注册</span>
          </div>
        </template>
        <el-form :model="form" label-width="120px">
          <el-form-item label="邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="密码"><el-input v-model="form.password" /> </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
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
import { reactive } from 'vue'
const form = reactive({
  email: '',
  password: ''
})
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style></style>
