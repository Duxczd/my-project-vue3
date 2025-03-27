import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store'
import elementPuls from './plugins/element-puls'
import './styles/reset.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router).use(pinia).use(elementPuls).mount('#app')