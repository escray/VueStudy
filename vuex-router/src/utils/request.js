// https://github.com/hug-sun/element3-admin-template/blob/master/src/utils/request.js

import axios from 'axios'
import { useMsgbox, useMessage } from 'element3'
import store from '@/store'
import { getToken } from '@/utils/auth'

const Message = useMessage()
const Msgbox = useMsgbox()

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // url = base url + request url
  // withCredentials: true,
  // send cookies when cross-domain requests
  // request timeout
  timeout: 5000
})

// response interceptor
service.interceptors.request.use(
  // do something before request is sent
  config => {
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // for debug
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
    /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token;
      // 50012: Other clients logged in;
      // 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Msgbox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
