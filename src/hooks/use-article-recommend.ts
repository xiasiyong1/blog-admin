import * as articleRecommendApi from '@/apis/article-recommend'
import type { ArticleRecommend } from '@/types/article-recommend'
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'

const useArticleRecommend = () => {
  const articleRecommendList = ref<ArticleRecommend[]>([])

  const articleRecommendStatusMap = computed(() => {
    return articleRecommendList.value.reduce(
      (acc, cur) => {
        acc[cur.articleId] = true
        return acc
      },
      {} as Record<number, boolean>
    )
  })

  const getArticleRecommendList = () => {
    articleRecommendApi.getArticleRecommendList().then((res) => {
      articleRecommendList.value = res.data.data
    })
  }

  const changeArticleRecommendStatus = (articleId: number, status: boolean | undefined) => {
    const api = status
      ? articleRecommendApi.removeArticleRecommend
      : articleRecommendApi.addArticleRecommend
    api(articleId).then(() => {
      ElMessage.success(status ? '取消推荐成功' : '推荐成功')
      getArticleRecommendList()
    })
  }

  onMounted(() => {
    getArticleRecommendList()
  })

  console.log(articleRecommendStatusMap)

  return {
    articleRecommendList,
    articleRecommendStatusMap,
    changeArticleRecommendStatus
  }
}

export default useArticleRecommend
