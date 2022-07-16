import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 8000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.users.token
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
