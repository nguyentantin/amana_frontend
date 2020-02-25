import { STORAGE_KEY, HTTP_CODE } from '../config/constants'

export default {
  getAccessToken: () => {
    return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) || null
  },

  getRefreshToken: () => {
    return localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN) || null
  },

  saveToken: (payload) => {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, payload.access_token)
    localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, payload.refresh_token)
  },

  removeToken: () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN)
  },
}
