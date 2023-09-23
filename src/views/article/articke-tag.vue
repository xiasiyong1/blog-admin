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
      <el-table-column prop="category" label="文章分类">
        <template #default="scope">
          <span>{{ articleCategoryNameMap[scope.row.categoryId] }}</span>
        </template>
      </el-table-column>
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
        <el-form-item label="文章分类" prop="categoryId">
          <el-select v-model="addTagForm.categoryId" placeholder="请选择文章分类">
            <el-option
              :label="category.name"
              :value="category.id"
              v-for="category in categoryList"
              :key="category.id"
            />
          </el-select>
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
import type { ArticleTag, GetArticleTagDto } from '@/types/article-tag'
import type { FormInstance, FormRules } from 'element-plus'
import {
  getArticleTagList,
  createArticleTag,
  deleteArticleTagById,
  updateArticleTagById
} from '@/apis/article-tag'
import { getArticleCategoryList } from '@/apis/article-category'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import type { ArticleCategory } from '@/types/article-category'

const total = ref(0)

const tags = ref<ArticleTag[]>([])
const categoryList = ref<ArticleCategory[]>([])

const form = reactive({
  name: '',
  currentPage: 1,
  pageSize: 10
})

const addTagForm = reactive<{ name: string; id?: number; categoryId: number | undefined }>({
  name: '',
  categoryId: undefined
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
  ],
  categoryId: [
    {
      required: true,
      message: '请选择分类',
      trigger: ['blur', 'change']
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
        updateArticleTagById(addTagForm.id, {
          name: addTagForm.name,
          categoryId: addTagForm.categoryId as number
        })
          .then((res) => {
            ElMessage({
              message: `标签${res.data.data.name}编辑成功`,
              type: 'success'
            })
            getTags({ name: form.name })
            addTagForm.name = ''
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        createArticleTag({
          name: addTagForm.name,
          categoryId: addTagForm.categoryId as number
        })
          .then((res) => {
            ElMessage({
              message: `标签${res.data.data.name}添加成功`,
              type: 'success'
            })
            getTags({ name: form.name })
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

const editTag = (tag: ArticleTag) => {
  addTagForm.id = tag.id
  addTagForm.name = tag.name
  addTagForm.categoryId = tag.categoryId
  dialogVisible.value = true
}

const deleteTag = (role: ArticleTag) => {
  deleteArticleTagById(role.id)
    .then(() => {
      ElMessage.success(`标签${role.name}删除成功`)
    })
    .then(() => {
      getTags({
        name: form.name
      })
    })
}

const getTags = (params: GetArticleTagDto) => {
  getArticleTagList(params).then((res) => {
    tags.value = res.data.data
  })
}
const articleCategoryNameMap = computed(() => {
  return categoryList.value.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.name
      return acc
    },
    {} as Record<number, string>
  )
})

watchEffect(() => {
  getTags({
    name: form.name
  })
})

const getCategoryList = () => {
  getArticleCategoryList({}).then((res) => {
    categoryList.value = res.data.data
  })
  categoryList.value = []
}

onMounted(() => {
  getCategoryList()
})
</script>

<style></style>
