import { onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
const SERVER_EXCEPTION_CODES = [400, 401, 403, 404]

const useUnhandledRejection = () => {
  onBeforeMount(() => {
    window.addEventListener('unhandledrejection', (event) => {
      console.log('unhandledrejection', event)
      // 请求压根就没有发出去
      if (!event.reason.response) {
        ElMessage.error(event.reason.message)
      }
      if (SERVER_EXCEPTION_CODES.includes(event.reason.response.status)) {
        ElMessage.error(event.reason.response.data.message)
      }
    })
  })
}

export default useUnhandledRejection
