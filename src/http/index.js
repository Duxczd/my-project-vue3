import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建 axios 实例
const http = axios.create({
  baseURL: Boolean(import.meta.env.VITE_APP_USE_MOCK) ? import.meta.env.VITE_APP_MOCK_BASEURL : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 180000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 从本地存储获取 token
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    // 获取状态码和消息
    const code = res.errcode || res.code
    const message = res.errmsg || res.message || '未知错误'

    // 成功状态
    if (code === 200) {
      return res  // 直接返回数据部分，而不是整个 response 对象
    }

    // 文件下载等特殊情况，直接返回
    if (code === undefined) {
      return response
    }

    // 登录失效
    if (code === 302) {
      ElMessage({ message: message || '登录已过期，请重新登录', type: 'error', duration: 3000 })
      // 清除用户信息
      sessionStorage.removeItem('token')
      sessionStorage.clear()
      // 跳转到登录页
      router.push({ name: 'Login' })
      return Promise.reject(new Error(message || '登录已过期'))
    }

    // 其他错误
    ElMessage({ message: message, type: 'error', duration: 3000 })
    return Promise.reject(new Error(message))
  },
  error => {
    // 处理 HTTP 错误状态
    let message = '网络错误，请稍后重试'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          // 清除用户信息
          sessionStorage.removeItem('token')
          sessionStorage.clear()
          // 跳转到登录页
          router.push({ name: 'Login' })
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求错误 (${error.response.status})`
      }
    } else if (error.message.includes('timeout')) {
      message = '请求超时，请稍后重试'
    }

    ElMessage({ message: message, type: 'error', duration: 3000 })
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export function get (url, params) {
  return http.get(url, { params })
}

// 封装 POST 请求
export function post (url, data) {
  return http.post(url, data)
}

// 封装 PUT 请求
export function put (url, data) {
  return http.put(url, data)
}

// 封装 DELETE 请求
export function del (url, params) {
  return http.delete(url, { params })
}

// 导出 axios 实例
export default http