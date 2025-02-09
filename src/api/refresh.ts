import {
  onSetLocalStorageHandler,
  onSetCookieHandler,
} from './../util/cookie/index'
import axios from 'axios'

export const refresh = async (config: any) => {
  const refreshToken = localStorage.getItem('refresh')
  let token: any = localStorage.getItem('authorization')
  const expiredSec = 58 * 60 * 1000
  const body = {
    refreshToken,
  }
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/refresh`,
    body
  )

  setTimeout(() => {
    token = data.accessToken
    onSetLocalStorageHandler('authorization', token)
    onSetCookieHandler('authorization', token)
  }, expiredSec)

  config.headers['authorization'] = `Bearer ${token}`
  return config
}
export const refreshErrorHandle = (err: any) => {
  console.log(err)
}
