import { STORAGE_KEY } from '../config/constants'

export default {
  getAccessToken: () => {
    return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) || null
  },

  getRefreshToken: () => {
    return localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN) || null
  },

  saveToken: (payload) => {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, payload.accessToken)
    localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, payload.refreshToken)
  },

  removeToken: () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN)
  },
}
