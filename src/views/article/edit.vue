<template>
  <div class="flex justify-end" @click.self="hidePublishPop">
    <el-button @click="back">返回</el-button>
    <el-popover
      placement="top-start"
      title="文章信息"
      :width="400"
      trigger="click"
      :visible="publishPopVisible"
    >
      <template #reference>
        <el-button type="primary" @click="showPublishPop">发布</el-button>
      </template>
      <el-form class="mt-4 p-2">
        <el-form-item label="文章分类">
          <el-select v-model="form.categoryId" placeholder="请选择文章分类">
            <el-option
              :label="category.name"
              :value="category.id"
              v-for="category in categoryList"
              :key="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select v-model="form.tagIds" multiple placeholder="请选择文章标签">
            <el-option :label="tag.name" :value="tag.id" v-for="tag in tagList" :key="tag.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input v-model="form.summary" />
        </el-form-item>
        <el-form-item class="al">
          <div class="flex justify-end">
            <el-button type="primary" @click="publishArticle">提交</el-button>
            <el-button @click="hidePublishPop">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
  <div @click="hidePublishPop">
    <el-form class="mt-4">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" />
      </el-form-item>
    </el-form>
    <Editor :value="form.content" :plugins="plugins" @change="handleChange" class="mt-4 editor" />
  </div>
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import 'github-markdown-css/github-markdown.css'
import gfm from '@bytemd/plugin-gfm'
// @ts-ignore
import { Editor } from '@bytemd/vue-next'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadProps } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import articleApi from '@/apis/article'
import type { Category } from '@/types/category'
import type { Tag } from '@/types/tag'
import type { AddArticle } from '@/types/article'

const router = useRouter()
const {
  params: { id }
} = useRoute()

const form = reactive<AddArticle>({
  title: '',
  content: '',
  categoryId: 0,
  tagIds: [],
  cover: '',
  summary: ''
})

const publishPopVisible = ref(false)

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.cover = URL.createObjectURL(uploadFile.raw!)
}

enum ARTICLE_STATUS {
  EDIT = 'edit',
  VIEW = 'view'
}

const plugins = [
  gfm()
  // Add more plugins here
]
const articleStatus = ref(ARTICLE_STATUS.VIEW)
const handleChange = (v: string) => {
  form.content = v
}
const edit = () => {
  articleStatus.value = ARTICLE_STATUS.EDIT
}
const cancelEdit = () => {
  articleStatus.value = ARTICLE_STATUS.VIEW
}
const publishArticle = () => {
  if (id) {
    articleApi.updateArticle({ id: +id, ...form }).then((res) => {
      ElMessage.success('编辑成功')
      router.back()
    })
  } else {
    articleApi.addArticle(form).then((res) => {
      ElMessage.success('创建成功')
      router.back()
    })
  }
}

const showPublishPop = () => {
  publishPopVisible.value = true
}
const hidePublishPop = () => {
  publishPopVisible.value = false
}
const back = () => {
  router.back()
}

const categoryList = ref<Category[]>([])
const tagList = ref<Tag[]>([])

const getArticleCategoryList = () => {
  articleApi.getAllCategoryList({}).then((res) => {
    categoryList.value = res.data.categoryList
    form.categoryId = res.data.categoryList[0].id
  })
}
const getArticleCategoryTags = () => {
  articleApi.getAllTags({}).then((res) => {
    tagList.value = res.data.tags
  })
}

const getArticleOptions = () => {
  getArticleCategoryList()
  getArticleCategoryTags()
}

const getArticleDetail = (id: number) => {
  articleApi.getArticle({ id }).then((res) => {
    form.title = res.data.title
    form.content = res.data.content
    form.categoryId = res.data.category.id
    form.tagIds = res.data.tags.map((tag) => tag.id)
    form.cover = res.data.cover
    form.summary = res.data.summary
  })
}

onMounted(() => {
  getArticleOptions()
  if (id) {
    getArticleDetail(+id)
  }
})
</script>

<style lang="less">
.editor .bytemd {
  height: calc(100vh - 150px);
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
