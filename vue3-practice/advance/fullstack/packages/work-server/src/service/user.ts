import {
  findUserByUsernameAndPassword,
  checkUserIsUsernameExist,
  createUser
} from '../model/user'
import type { MyAPIResult } from './types'
import type { UserInfo } from '../model/user'

export async function queryAccount(params: {
  username?: string
  password?: string
}): Promise<MyAPIResult> {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: 'Sign In Failed'
  }
  const { username, password } = params
  if (username && password) {
    const modalData: UserInfo | null = await findUserByUsernameAndPassword({
      username,
      password
    })
    result.success = true
    result.message = 'Sign In Success'
    result.data = {
      allow: modalData !== null,
      username: modalData?.username,
      uuid: modalData?.uuid
    }
  } else {
    result.message = 'Sign In Failed, either username or password is wrong'
  }
  return result
}

export async function registerUser(params: {
  username?: string
  password?: string
}): Promise<MyAPIResult> {
  const { username, password } = params
  let result: MyAPIResult = {
    data: null,
    success: false,
    message: 'Sign Up Failed'
  }
  if (!username || !password) {
    result.message = 'sign up infomation missed'
    return result
  }

  try {
    const isExist = await checkUserIsUsernameExist({ username })
    if (isExist === true) {
      result.message = 'User Name Existed'
      return result
    }
    const createResult = await createUser({ username, password })
    result = {
      data: createResult,
      success: true,
      message: 'Sign Up Success'
    }
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.log(err)
    result.message = err?.toString() || 'Something Wrong'
  }
  return result
}
