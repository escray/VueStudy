<<<<<<< HEAD
// https://github.com/hug-sun/element3-admin-template/blob/master/src/utils/request.js

=======
>>>>>>> b5443f9414c14a537244784f776900de289806b2
import axios from 'axios'
import { useMsgbox, useMessage } from 'element3'
import store from '@/store'
import { getToken } from '@/utils/auth'

const Message = useMessage()
const Msgbox = useMsgbox()

<<<<<<< HEAD
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // url = base url + request url
  // withCredentials: true,
  // send cookies when cross-domain requests
=======
// create an axios instanc
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
>>>>>>> b5443f9414c14a537244784f776900de289806b2
  // request timeout
  timeout: 5000
})

<<<<<<< HEAD
// response interceptor
service.interceptors.request.use(
  // do something before request is sent
  config => {
=======
// request intercepto
service.interceptors.request.use(

  config => {
    // do something before request is sen
>>>>>>> b5443f9414c14a537244784f776900de289806b2
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
<<<<<<< HEAD
      config.headers["X-Token"] = getToken()
=======
      config.headers['X-Token'] = getToken()
>>>>>>> b5443f9414c14a537244784f776900de289806b2
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

<<<<<<< HEAD
// response interceptor
service.interceptors.response.use(
    /**
=======
// response intercepto
service.interceptors.response.use(
  /**
>>>>>>> b5443f9414c14a537244784f776900de289806b2
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
<<<<<<< HEAD
    if (res.code !== 20000) {
=======
    // if the custom code is not 20000, it is judged as an error.
    if (res.code != 20000) {
>>>>>>> b5443f9414c14a537244784f776900de289806b2
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
<<<<<<< HEAD

      // 50008: Illegal token;
      // 50012: Other clients logged in;
      // 50014: Token expired;
=======
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
>>>>>>> b5443f9414c14a537244784f776900de289806b2
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
<<<<<<< HEAD
    console.log('err' + error)
=======
    console.log('err' + error) // for debug
>>>>>>> b5443f9414c14a537244784f776900de289806b2
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
