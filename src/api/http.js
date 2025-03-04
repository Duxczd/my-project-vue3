import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASEURL
// 请求超时时间
axios.defaults.timeout = 180000

// axios实例拦截请求
axios.interceptors.request.use(
  (config) => { return config },
  (error) => { return Promise.reject(error) }
)

// axios实例拦截响应
axios.interceptors.response.use(
  (response) => { },
  (error) => { }
)

export default axios