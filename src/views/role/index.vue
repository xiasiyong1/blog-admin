<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="角色名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search" class="ml-4">搜索</el-button>
          <el-button type="success" @click="showAddRoleDialog" class="ml-4">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="roles" border stripe style="width: 100%">
      <el-table-column prop="id" label="Date">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small">
              <router-link :to="`/home/role/casl/${scope.row.id}`">权限管理</router-link>
            </el-button>
            <el-button text type="primary" size="small" @click="editRole(scope.row)"
              >编辑角色</el-button
            >
            <el-popconfirm
              :title="`确认要删除${scope.row.name}吗？`"
              width="230"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteRole(scope.row)"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除角色</el-button>
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
    <el-dialog
      v-model="dialogVisible"
      :title="addRoleForm.id ? '编辑角色' : '添加角色'"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px" :rules="rules" ref="addRoleFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.name" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addRole(addRoleFormRef)"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Role } from '@/types/role'
import type { FormInstance, FormRules } from 'element-plus'
import roleApi from '@/apis/role'
import { reactive, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

const roles = ref<Role[]>([])
const total = ref(0)

const form = reactive({
  name: '',
  currentPage: 1,
  pageSize: 10
})

const addRoleForm = reactive<{ name: string; id?: number }>({
  name: ''
})
const addRoleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<typeof addRoleForm>>({
  name: [
    {
      min: 3,
      max: 20,
      required: true,
      message: '角色名称的长度在3-20个字符之间',
      trigger: ['blur']
    }
  ]
})

const search = () => {
  console.log(form)
}

const dialogVisible = ref(false)

const showAddRoleDialog = () => {
  dialogVisible.value = true
}

const handleClose = () => {
  dialogVisible.value = false
}

const addRole = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (addRoleForm.id) {
        roleApi
          .updateRole({
            name: addRoleForm.name,
            id: addRoleForm.id
          })
          .then((res) => {
            ElMessage({
              message: `角色${res.data.name}编辑成功`,
              type: 'success'
            })
            getRoles({ currentPage: form.currentPage, pageSize: form.pageSize, name: form.name })
            addRoleForm.name = ''
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        roleApi
          .addRole(addRoleForm)
          .then((res) => {
            ElMessage({
              message: `角色${res.data.name}添加成功`,
              type: 'success'
            })
            getRoles({ currentPage: form.currentPage, pageSize: form.pageSize, name: form.name })
            addRoleForm.name = ''
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.log('error submit!')
    }
  })
}

const editRole = (role: Role) => {
  addRoleForm.id = role.id
  addRoleForm.name = role.name
  dialogVisible.value = true
}

const deleteRole = (role: Role) => {
  roleApi
    .deleteRole({ id: role.id })
    .then(() => {
      ElMessage.success(`角色${role.name}删除成功`)
    })
    .then(() => {
      getRoles({
        currentPage: form.currentPage,
        pageSize: form.pageSize,
        name: form.name
      })
    })
}

const getRoles = (params: { currentPage?: number; pageSize?: number; name?: string }) => {
  roleApi.findRoles(params).then((res) => {
    roles.value = res.data.roles
    total.value = res.data.count
  })
}

watchEffect(() => {
  getRoles({
    currentPage: form.currentPage,
    pageSize: form.pageSize,
    name: form.name
  })
})
</script>

<style></style>
