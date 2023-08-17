<template>
  <el-row class="flex items-center justify-center h-[100vh]">
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>登录</span>
          </div>
        </template>
        <el-form :model="form" label-width="120px">
          <el-form-item label="邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="密码"><el-input v-model="form.password" /> </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
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
