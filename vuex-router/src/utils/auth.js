<<<<<<< HEAD
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken() {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
=======
import { useStorage } from './storage'

export const getToken = () => useStorage('token').value
>>>>>>> b5443f9414c14a537244784f776900de289806b2
