import axios from 'axios'
import store from '../store'
import { getToken } from '../utils/auth'
import { Message } from 'element3'

const service = axios.create({
  baseURL: "/",
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ${token}'
    }
    return config
  },
  error => {
    console.log(error, 'Have Error')
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      Message({
        type: 'warning',
        message: "login failed, plean relogin"
      })
      return Promise.reject(new Error(res.data || 'Error'))
    }
    if (res.code !== 20000) {
      console.log('interface message error', res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('interface message error' + error)
    return Promise.reject(new Error(res.message || 'Error'))
  },
)

export default service
