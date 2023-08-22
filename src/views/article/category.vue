<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="分类">
            <el-input v-model.lazy="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search" class="ml-4">搜索</el-button>
          <el-button type="success" @click="showAddCategoryDialog" class="ml-4">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="categoryList" border stripe style="width: 100%">
      <el-table-column prop="id" label="id">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small" @click="editCategory(scope.row)"
              >编辑分类</el-button
            >
            <el-popconfirm
              :title="`确认要删除【${scope.row.name}】吗？`"
              width="230"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteCategory(scope.row)"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除分类</el-button>
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
      :title="addCategoryForm.id ? '编辑分类' : '添加分类'"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="addCategoryForm" label-width="120px" :rules="rules" ref="addCategoryFormRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addCategoryForm.name" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addCategory(addCategoryFormRef)"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/category'
import type { FormInstance, FormRules } from 'element-plus'
import articleApi from '@/apis/article'
import { reactive, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

const total = ref(0)

const categoryList = ref<Category[]>([])

const form = reactive({
  name: '',
  currentPage: 1,
  pageSize: 10
})

const addCategoryForm = reactive<{ name: string; id?: number }>({
  name: ''
})
const addCategoryFormRef = ref<FormInstance>()

const rules = reactive<FormRules<typeof addCategoryForm>>({
  name: [
    {
      min: 2,
      max: 20,
      required: true,
      message: '分类名称的长度在2-20个字符之间',
      trigger: ['blur']
    }
  ]
})

const search = () => {
  getCategoryList({
    name: form.name
  })
}

const dialogVisible = ref(false)

const showAddCategoryDialog = () => {
  dialogVisible.value = true
}

const handleClose = () => {
  dialogVisible.value = false
}

const addCategory = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (addCategoryForm.id) {
        articleApi
          .updateTag({
            name: addCategoryForm.name,
            id: addCategoryForm.id
          })
          .then((res) => {
            ElMessage({
              message: `分类${res.data.name}编辑成功`,
              type: 'success'
            })
            getCategoryList({
              currentPage: form.currentPage,
              pageSize: form.pageSize,
              name: form.name
            })
            addCategoryForm.name = ''
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        articleApi
          .addCategory(addCategoryForm)
          .then((res) => {
            ElMessage({
              message: `分类${res.data.name}添加成功`,
              type: 'success'
            })
            getCategoryList({
              currentPage: form.currentPage,
              pageSize: form.pageSize,
              name: form.name
            })
            addCategoryForm.name = ''
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

const editCategory = (role: Category) => {
  addCategoryForm.id = role.id
  addCategoryForm.name = role.name
  dialogVisible.value = true
}

const deleteCategory = (role: Category) => {
  articleApi
    .deleteCategory({ id: role.id })
    .then(() => {
      ElMessage.success(`分类${role.name}删除成功`)
    })
    .then(() => {
      getCategoryList({
        currentPage: form.currentPage,
        pageSize: form.pageSize,
        name: form.name
      })
    })
}

const getCategoryList = (params: { currentPage?: number; pageSize?: number; name?: string }) => {
  articleApi.getAllCategoryList(params).then((res) => {
    categoryList.value = res.data.categoryList
    total.value = res.data.count
  })
}

watchEffect(() => {
  getCategoryList({
    currentPage: form.currentPage,
    pageSize: form.pageSize,
    name: form.name
  })
})
</script>

<style></style>
