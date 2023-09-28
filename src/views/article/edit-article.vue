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
            :action="imageUploadUrl"
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
    <Editor
      :value="form.content"
      :plugins="plugins"
      @change="handleChange"
      :uploadImages="uploadImages"
      class="mt-4 editor"
    />
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
import * as articleApi from '@/apis/article'
import * as articleCategoryApi from '@/apis/article-category'
import * as articleTagApi from '@/apis/article-tag'
import type { ArticleCategory } from '@/types/article-category'
import type { ArticleTag } from '@/types/article-tag'
import type { CreateArticleDto } from '@/types/article'
import { uploadImages } from '@/apis/upload'

const imageUploadUrl = import.meta.env.VITE_IMAGE_UPLOAD_URL

const router = useRouter()
const {
  params: { id }
} = useRoute()

const form = reactive<CreateArticleDto>({
  title: '',
  content: '',
  categoryId: undefined,
  tagIds: [],
  cover: '',
  summary: ''
})

const publishPopVisible = ref(false)

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.cover = import.meta.env.VITE_IMAGE_PREVIEW_PREFIX + response.data
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
    articleApi.updateArticleById(+id, form).then((res) => {
      ElMessage.success('编辑成功')
      router.back()
    })
  } else {
    articleApi
      .createArticle({
        title: form.title,
        cover: form.cover,
        summary: form.summary,
        content: form.content,
        categoryId: form.categoryId as number,
        tagIds: form.tagIds
      })
      .then((res) => {
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

const categoryList = ref<ArticleCategory[]>([])
const tagList = ref<ArticleTag[]>([])

const getArticleCategoryList = () => {
  articleCategoryApi.getArticleCategoryList({}).then((res) => {
    categoryList.value = res.data.data
  })
}
const getArticleCategoryTags = () => {
  articleTagApi.getArticleTagList({}).then((res) => {
    tagList.value = res.data.data
  })
}

const getArticleOptions = () => {
  getArticleCategoryList()
  getArticleCategoryTags()
}

const getArticleDetail = (id: number) => {
  articleApi.getArticleInfoById(id).then((res) => {
    form.title = res.data.data.title
    form.content = res.data.data.content
    form.categoryId = res.data.data.categoryId
    form.tagIds = res.data.data.tags.map((tag) => tag.id)
    form.cover = res.data.data.cover
    form.summary = res.data.data.summary
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
