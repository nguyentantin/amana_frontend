const API_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost'

const REQUEST_HEADER = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

const GOOGLE_WEB_FONT = {
  google: {'families': ['Quicksand:400,700', 'Open Sans:300,400,700&display=swap']},
  active: () => {
    sessionStorage.fonts = true
  },
}

const GOOGLE_WEB_FONT_STATUS = {
  inactive: 'inactive',
  active: 'active',
  loading: 'loading',
}

const LOGIN_CREDENTIALS = {
  'client_id': process.env.REACT_APP_CLIENT_ID || 0,
  'client_secret': process.env.REACT_APP_CLIENT_SECRET || '',
  'grant_type': 'password'
}

const STORAGE_KEY = {
  ACCESS_TOKEN: 'Auth_access_token',
  REFRESH_TOKEN: 'Auth_refresh_token'
}

const HTTP_CODE = {
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
}

const PLATFORM_TYPE = {
  ANDROID: 'android',
  IOS: 'iOS'
}

export {
  REQUEST_HEADER,
  API_URL,
  STORAGE_KEY,
  LOGIN_CREDENTIALS,
  HTTP_CODE,
  GOOGLE_WEB_FONT,
  GOOGLE_WEB_FONT_STATUS,
  PLATFORM_TYPE,
}
