// 使用Vite的import.meta.glob动态导入模块
const modules = import.meta.glob('./module/*.js', { eager: true })

// 构建API对象
const api = {}
for (const path in modules) {
  const moduleName = path.replace('./module/', '').replace('.js', '')
  api[moduleName] = modules[path].default
}

export default api
