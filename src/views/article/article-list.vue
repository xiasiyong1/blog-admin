<template>
  <div>
    <el-form :model="form" label-width="120px">
      <div class="flex">
        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="请输入文章标签" />
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="form.categoryId" placeholder="请选择文章分类">
            <el-option
              :label="category.name"
              :value="category.id"
              v-for="category in categoryList"
              :key="category.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="标签">
          <el-select v-model="form.tagIds" multiple placeholder="选择文章标签">
            <el-option :label="tag.name" :value="tag.id" v-for="tag in tagList" :key="tag.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="form.createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>

        <el-button type="primary" @click="search" class="ml-4">搜索</el-button>
        <el-button type="success" @click="create" class="ml-4">新建</el-button>
      </div>
    </el-form>
    <el-table :data="articleList" border stripe style="width: 100%" class="mt-4">
      <el-table-column prop="id" label="id">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题" />
      <el-table-column prop="category" label="文章分类">
        <template #default="scope">
          <ElTag>{{ articleCategoryNameMap[scope.row.categoryId] }}</ElTag>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="文章标签">
        <template #default="scope">
          <ElSpace>
            <ElTag v-for="tag in scope.row.tags" :key="tag.id">
              {{ tag.name }}
            </ElTag>
          </ElSpace>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="创建时间">
        <template #default="scope">
          <span>{{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template #default="scope">
          <span>{{ dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group>
            <el-button text type="primary" size="small">
              <router-link :to="`/home/article/${scope.row.id}`">编辑</router-link>
            </el-button>
            <el-button
              text
              type="success"
              size="small"
              @click="
                changeArticleRecommendStatus(scope.row.id, articleRecommendStatusMap[scope.row.id])
              "
            >
              {{ articleRecommendStatusMap[scope.row.id] ? '取消推荐' : '推荐文章' }}
            </el-button>
            <el-popconfirm
              :title="`确认要删除【${scope.row.title}】吗？`"
              width="230"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteArticle(scope.row)"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除文章</el-button>
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
      :total="count"
      v-model:current-page="form.currentPage"
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import { findArticleList, deleteArticleById } from '@/apis/article'
import * as articleCategoryApi from '@/apis/article-category'
import * as articleTagApi from '@/apis/article-tag'
import type { Article, ArticleConditionParams, FindArticleListDto } from '@/types/article'
import { ElMessage, ElTag, ElSpace } from 'element-plus'
import type { ArticleCategory } from '@/types/article-category'
import type { ArticleTag } from '@/types/article-tag'
import dayjs from 'dayjs'
import useArticleRecommend from '@/hooks/use-article-recommend'

const router = useRouter()

const articleList = ref<Article[]>([])
const count = ref(0)

const { articleRecommendStatusMap, changeArticleRecommendStatus } = useArticleRecommend()

const form = reactive<ArticleConditionParams>({
  title: '',
  tagIds: [],
  categoryId: undefined,
  currentPage: 1,
  pageSize: 10,
  createTime: undefined
})

const search = () => {
  const { tagIds, createTime, title, categoryId } = form
  const params: any = { title, categoryId }

  if (createTime) {
    params.startTime = createTime[0]
    params.endTime = createTime[1]
  }
  if (tagIds instanceof Array && tagIds.length > 0) {
    params.tagIds = tagIds.join(',')
  }
  getArticleList(params)
}

const create = () => {
  router.push('/home/article/create')
}

const deleteArticle = (article: Article) => {
  deleteArticleById(article.id).then(() => {
    ElMessage.success('删除成功')
    getArticleList({ currentPage: form.currentPage, pageSize: form.pageSize })
  })
}

const getArticleList = (params: FindArticleListDto) => {
  findArticleList(params).then((res) => {
    articleList.value = res.data.data.articleList
    count.value = res.data.data.count
  })
}

const categoryList = ref<ArticleCategory[]>([])
const tagList = ref<ArticleTag[]>([])

const articleCategoryNameMap = computed(() => {
  return categoryList.value.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.name
      return acc
    },
    {} as Record<number, string>
  )
})

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
const getArticleData = () => {
  getArticleCategoryList()
  getArticleCategoryTags()
}

onMounted(() => {
  getArticleData()
  getArticleList({ currentPage: form.currentPage, pageSize: form.pageSize })
})
</script>

<style></style>
