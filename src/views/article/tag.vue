<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="标签">
            <el-input v-model.lazy="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search" class="ml-4">搜索</el-button>
          <el-button type="success" @click="showAddRoleDialog" class="ml-4">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tags" border stripe style="width: 100%">
      <el-table-column prop="id" label="id">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标签名称" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small" @click="editTag(scope.row)"
              >编辑标签</el-button
            >
            <el-popconfirm
              :title="`确认要删除${scope.row.name}吗？`"
              width="230"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteTag(scope.row)"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除标签</el-button>
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
      :title="addTagForm.id ? '编辑标签' : '添加标签'"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="addTagForm" label-width="120px" :rules="rules" ref="addTagFormRef">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="addTagForm.name" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addTag(addTagFormRef)"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/types/tag'
import type { FormInstance, FormRules } from 'element-plus'
import articleApi from '@/apis/article'
import { reactive, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

const total = ref(0)

const tags = ref<Tag[]>([])

const form = reactive({
  name: '',
  currentPage: 1,
  pageSize: 10
})

const addTagForm = reactive<{ name: string; id?: number }>({
  name: ''
})
const addTagFormRef = ref<FormInstance>()

const rules = reactive<FormRules<typeof addTagForm>>({
  name: [
    {
      min: 2,
      max: 20,
      required: true,
      message: '标签名称的长度在2-20个字符之间',
      trigger: ['blur']
    }
  ]
})

const search = () => {
  getTags({
    name: form.name
  })
}

const dialogVisible = ref(false)

const showAddRoleDialog = () => {
  dialogVisible.value = true
}

const handleClose = () => {
  dialogVisible.value = false
}

const addTag = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (addTagForm.id) {
        articleApi
          .updateTag({
            name: addTagForm.name,
            id: addTagForm.id
          })
          .then((res) => {
            ElMessage({
              message: `标签${res.data.name}编辑成功`,
              type: 'success'
            })
            getTags({ currentPage: form.currentPage, pageSize: form.pageSize, name: form.name })
            addTagForm.name = ''
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        articleApi
          .addTag(addTagForm)
          .then((res) => {
            ElMessage({
              message: `标签${res.data.name}添加成功`,
              type: 'success'
            })
            getTags({ currentPage: form.currentPage, pageSize: form.pageSize, name: form.name })
            addTagForm.name = ''
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

const editTag = (role: Tag) => {
  addTagForm.id = role.id
  addTagForm.name = role.name
  dialogVisible.value = true
}

const deleteTag = (role: Tag) => {
  articleApi
    .deleteTag({ id: role.id })
    .then(() => {
      ElMessage.success(`标签${role.name}删除成功`)
    })
    .then(() => {
      getTags({
        currentPage: form.currentPage,
        pageSize: form.pageSize,
        name: form.name
      })
    })
}

const getTags = (params: { currentPage?: number; pageSize?: number; name?: string }) => {
  articleApi.getAllTags(params).then((res) => {
    tags.value = res.data.tags
    total.value = res.data.count
  })
}

watchEffect(() => {
  getTags({
    currentPage: form.currentPage,
    pageSize: form.pageSize,
    name: form.name
  })
})
</script>

<style></style>
