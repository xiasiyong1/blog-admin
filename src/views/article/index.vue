<template>
  <div>
    <el-form :model="form" label-width="120px">
      <div class="flex">
        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="请输入文章标签" />
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="form.category" multiple placeholder="选择文章分类">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple placeholder="选择文章标签">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="form.createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>

        <el-button type="primary" @click="search" class="ml-4">搜索</el-button>
        <el-button type="success" @click="create" class="ml-4">新建</el-button>
      </div>
    </el-form>
    <el-table :data="articles" border stripe style="width: 100%" class="mt-4">
      <el-table-column prop="id" label="Date">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题" />
      <el-table-column prop="category" label="文章分类" />
      <el-table-column prop="tags" label="文章标签" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small">
              <router-link :to="`/home/article/${scope.row.id}`">详情</router-link>
            </el-button>
            <el-button text type="danger" size="small">删除文章</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { Role } from '@/types/role'
import { useRouter } from 'vue-router'
// import userApi from '@/apis/user/'
import { reactive } from 'vue'

const router = useRouter()

const userList: Role[] = [
  {
    id: 1,
    name: '超级管理员',
    createTime: new Date()
  },
  {
    id: 2,
    name: '前端',
    createTime: new Date()
  }
]

const articles = [
  {
    id: 1,
    title: 'React基础',
    tags: [1, 2],
    category: 3,
    updateTime: new Date()
  },
  {
    id: 2,
    title: 'React进阶',
    tags: [1, 2],
    category: 3,
    updateTime: new Date()
  }
]

const form = reactive({
  title: '',
  tags: [],
  createTime: '',
  category: ''
})

const search = () => {
  console.log(form)
}

const create = () => {
  router.push('/home/article/create')
}
</script>

<style></style>
