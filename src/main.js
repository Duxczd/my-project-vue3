import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store'
import './styles/reset.css'
// import elementPuls from './plugins/element-puls'
// import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(router).use(pinia).use(elementPuls).mount('#app')
app.use(router).use(pinia).mount('#app')