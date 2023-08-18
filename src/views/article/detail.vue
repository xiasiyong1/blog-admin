<template>
  <div v-if="articleStatus === ARTICLE_STATUS.EDIT">
    <div>
      <el-button @click="cancelEdit">取消编辑</el-button>
      <el-button type="primary" @click="publishArticle">发布</el-button>
    </div>
    <Editor :value="content" :plugins="plugins" @change="handleChange" class="mt-4" />
  </div>

  <div class="markdown-body" v-if="articleStatus === ARTICLE_STATUS.VIEW">
    <div>
      <el-button type="primary" @click="edit">编辑</el-button>
    </div>
    <Viewer :value="content" :plugins="plugins" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import 'github-markdown-css/github-markdown.css'
import gfm from '@bytemd/plugin-gfm'
// @ts-ignore
import { Editor, Viewer } from '@bytemd/vue-next'
import { ref } from 'vue'

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
</script>

<style></style>
