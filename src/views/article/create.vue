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
          <el-select v-model="form.category" placeholder="请选择文章分类">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select v-model="form.tags" multiple placeholder="请选择文章标签">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
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
    <Editor :value="content" :plugins="plugins" @change="handleChange" class="mt-4 editor" />
  </div>
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import 'github-markdown-css/github-markdown.css'
import gfm from '@bytemd/plugin-gfm'
// @ts-ignore
import { Editor } from '@bytemd/vue-next'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  category: '',
  tags: [],
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
const content = ref('123123')
const articleStatus = ref(ARTICLE_STATUS.VIEW)
const handleChange = (v: string) => {
  console.log(v)
  content.value = v
}
const edit = () => {
  articleStatus.value = ARTICLE_STATUS.EDIT
}
const cancelEdit = () => {
  articleStatus.value = ARTICLE_STATUS.VIEW
}
const publishArticle = () => {}

const showPublishPop = () => {
  publishPopVisible.value = true
}
const hidePublishPop = () => {
  publishPopVisible.value = false
}
const back = () => {
  router.back()
}
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
