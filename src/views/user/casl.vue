<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色权限</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mt-4">
      <div v-for="(item, key) in casls" :key="key" class="mt-2">
        <div class="text-lg">{{ key }}</div>
        <el-checkbox-group v-model="form[key]">
          <el-checkbox :label="operate" v-for="operate in item" :key="operate" />
        </el-checkbox-group>
      </div>
    </div>
    <el-button type="primary" class="mt-4" @click="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import CASLS from '@/config/casl'
import type { Casl, CaslRecord } from '@/types/casl'
import userApi from '@/apis/user'
import { ElMessage } from 'element-plus'

const { params } = useRoute()

const form = reactive<CaslRecord>({})

const casls = reactive<CaslRecord>(CASLS)

Object.keys(CASLS).forEach((casl: string) => {
  form[casl] = []
})

const getUserInfo = () => {
  console.log(params)
  userApi.getUserInfo({ id: params.id as string }).then((res) => {
    if (res.data.casls) {
      const roleCasls = JSON.parse(res.data.casls)
      roleCasls.forEach((roleCasl: Casl) => {
        form[roleCasl.entity] = roleCasl.operations.split(',')
      })
      console.log(form)
    }
  })
}

const submit = () => {
  console.log(form)
  const data = Object.keys(form).reduce((acc, casl) => {
    if (form[casl].length > 0) {
      acc.push({
        entity: casl,
        operations: form[casl].join(',')
      })
    }
    return acc
  }, [] as Casl[])
  console.log(data)
  userApi.updateCasl({ id: params.id as string, casls: data }).then((res) => {
    ElMessage.success('更新成功')
  })
}

onMounted(() => {
  getUserInfo()
})
</script>

<style></style>
