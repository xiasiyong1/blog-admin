import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
const app = createApp(App)

app.config.errorHandler = (err: any, instance: any, info: any) => {
  console.error('errorHandler', err)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
