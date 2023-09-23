import axios from 'axios'
import { getAccessToken } from './localstorge'

const baseURL = import.meta.env.VITE_REQUEST_BASE_URL

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000
})

// 附加各业务请求头
axiosInstance.interceptors.request.use((config: any) => {
  const jwtToken = getAccessToken()
  if (jwtToken) {
    config.headers.authorization = `Bearer ${jwtToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.data.status === 401) {
      Promise.reject(response.data.response)
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosInstance
