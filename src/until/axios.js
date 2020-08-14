// 导入axios
import axios from 'axios'
// 导入加载中
import { Spin, Message } from 'iview'

// 创建带loading效果的请求实例
// const request = createAxios()

// // 请求实例创建函数
// function createAxios() {
//     const instance = axios.create({
//         baseUrl: 'http://49.235.22.67:3000/'
//     })

//     instance.interceptors.request.use(handleRequest)

//     instance.interceptors.response.use(handleResponse, handleResponseErr)
// }
// // 请求拦截器设置函数
// const handleRequest = config => {
//     console.log(config)
//     config.withCredentials = true
//     // 加载中遮罩层显示
//     Spin.show()
//     return config
// }
// // 响应拦截器执行函数
// const handleResponse = config => {
//     // 加载中遮罩层隐藏
//     window.setTimeout(() => {
//         if (config.status === 200) {
//             Spin.hide()
//         }
//     }, 1500)
//     console.log(config)
//     return config
// }
// // 响应拦截器错误执行函数
// const handleResponseErr = (e) => {
//     Message.warning(`${e}`)
//     console.log(e)
// }

// 配置根url
axios.defaults.baseURL = 'http://49.235.22.67:3000/'

// // 挂载到原型对象上,每个组件都可以使用$http来发起ajax请求
// Vue.prototype.$http = axios

// 设置拦截器
axios.interceptors.request.use(config => {
    console.log(config)
    config.withCredentials = true
    // 加载中遮罩层显示
    Spin.show()
    return config
})

// 设置响应拦截器，隐藏进度条
axios.interceptors.response.use(config => {
    // 加载中遮罩层隐藏
    window.setTimeout(() => {
        if (config.status === 200) {
            Spin.hide()
        }
    }, 1500)
    // if (config.status === 200) {
    //   Spin.hide()
    // }
    console.log(config)
    return config
}, (e) => {
    Message.warning(`${e}`)
    console.log(e)
})
