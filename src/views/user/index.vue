<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱"> <el-input v-model="form.username" /> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="please select your zone">
              <el-option label="所有" value="0" />
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select> </el-form-item
        ></el-col>
      </el-row>

      <el-form-item label="角色">
        <el-checkbox-group v-model="form.roles">
          <el-checkbox label="1" name="roles">管理员</el-checkbox>
          <el-checkbox label="2" name="roles">普通用户</el-checkbox>
          <el-checkbox label="3" name="roles">测试</el-checkbox>
          <el-checkbox label="4" name="roles">开发</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border stripe style="width: 100%">
      <el-table-column prop="id" label="Date" width="180">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="avatar" label="头像" />
      <el-table-column prop="roles" label="角色" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small">
              <router-link :to="`/home/casl/${scope.row.id}`">权限管理</router-link>
            </el-button>
            <el-button text type="danger" size="small">删除用户</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/types/user'
import { reactive } from 'vue'

const userList: User[] = [
  {
    id: 1,
    username: 'Tom',
    gender: 0,
    avatar: 'No. 189, Grove St, Los Angeles',
    roles: [1, 2],
    email: '1233'
  }
]
const form = reactive({
  username: '',
  gender: '',
  roles: [],
  email: ''
})

const search = () => {
  console.log(form)
}
</script>

<style></style>
