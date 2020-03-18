import _ from 'lodash'
import axios from 'axios'
import history from '../utils/history'
import helpers from '../utils/helpers'

axios.interceptors.request.use(
  (config) => {
    const accessToken = helpers.getAccessToken()

    if (!_.isEmpty(accessToken)) {
      config.headers = _.assign(config.headers, {
        'Authorization': `Bearer ${helpers.getAccessToken()}`
      })
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {

    return response.data
  },
  (error) => {
    const statusCode = error.response && error.response.status
    switch (statusCode) {
      case 401:
        break
      case 403:
        break
      case 404:
        history.push('/404')
        break
      case 500:
        history.push('/500')
        break
      default:
        break
    }

    return Promise.reject(error.response && error.response.data)
  })
