// 导入axios
import axios from 'axios'
// 导入加载中
import { Spin, Message } from 'iview'

// 基本地址, 这个常量一定要放在前面，不然会出现访问当前项目的端口，而不是baseURL
const BASE_URL = 'http://49.235.22.67:3000/'

// 创建并导出普通 axios
export const request = createAxios()

// 创建 带loading的 axios 实例
export const loadingAxios = createLoadingAxios()

// 创建带loadin效果的 axios实例函数
function createLoadingAxios() {
  const instance = axios.create({
    baseURL: BASE_URL
  })

  // 请求拦截器
  instance.interceptors.request.use(loadingHandleRequest)

  // 响应拦截器
  instance.interceptors.response.use(loadingHandleResponse, handleError)
  return instance
}

// 普通请求的创建函数
function createAxios() {
  const instance = axios.create({
    baseURL: BASE_URL
  })

  // 请求拦截器
  instance.interceptors.request.use(handleRequest)

  // 响应拦截器
  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

// 带 loading 请求拦截器处理函数
function loadingHandleRequest(config) {
  config.withCredentials = true
  Spin.show()
  return config
}
// 带 loading 响应拦截器函数
function loadingHandleResponse(config) {
  // 加载中遮罩层显示
  if (config.status === 200) {
    window.setTimeout(() => {
      Spin.hide()
    }, 1000)
  }
  return config
}
// 响应错误函数
function handleError(e) {
  Message.warning(`${e}`)
  console.log(e)
}
// 普通请求拦截器
function handleRequest(config) {
  return config
}
// 普通响应拦截器
function handleResponse(config) {
  return config
}
