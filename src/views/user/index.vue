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
          <el-form-item label="邮箱"> <el-input v-model="form.email" /> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="请选择">
              <el-option label="未知" value="3" />
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="角色">
        <el-select multiple v-model="form.roles" placeholder="请选择">
          <el-option :label="role.name" :value="role.id" v-for="role in roles" :key="role.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
        <template #default="scope">
          <span>{{ scope.row.profile?.username }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱" width="180">
        <template #default="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template #default="scope">
          <span>{{ getGenderText(scope.row.profile.gender) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <span>{{ scope.row.profile?.avatar }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色">
        <template #default="scope">
          <el-space>
            <el-tag v-for="role in scope.row.roles" :key="role.id">{{ role.name }}</el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small">
              <router-link :to="`/home/user/casl/${scope.row.id}`">权限管理</router-link>
            </el-button>
            <el-popconfirm
              title="确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteUser"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除用户</el-button>
              </template>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="form.currentPage"
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import userApi from '@/apis/user/'
import roleApi from '@/apis/role/'
import { onMounted, reactive, ref } from 'vue'
import { GENDER_CONFIG } from '@/config/gender'
import { GenderEnum } from '@/enums/gender'
import type { GetUserList, User } from '@/types/user'
import { ro } from 'element-plus/lib/locale/index.js'
import type { Role } from '@/types/role'

const total = ref(0)
const roles = ref<Role[]>()

const form = reactive({
  username: '',
  gender: undefined,
  roles: [],
  email: '',
  currentPage: 1,
  pageSize: 10
})

const getGenderText = (gender: GenderEnum) => {
  return GENDER_CONFIG[gender || GenderEnum.UN_KNOWN]
}

const search = () => {
  getUserList(form)
}

const deleteUser = () => {
  alert(1)
}

const userList = ref<User[]>([])

const getUserList = (params: GetUserList) => {
  userApi.findAll(params).then((res) => {
    userList.value = res.data.userList
    total.value = res.data.total
  })
}
const getRoles = () => {
  roleApi.findRoles({}).then((res) => {
    roles.value = res.data.roles
  })
}

onMounted(() => {
  getUserList({
    currentPage: form.currentPage,
    pageSize: form.pageSize
  })
  getRoles()
})
</script>

<style></style>
