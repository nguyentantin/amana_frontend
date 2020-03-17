import produce from 'immer'
import {
  LOGIN_SUCCESS,
  REQUEST_LOGIN,
  REQUEST_REGISTER,
  REGISTER_SUCCESS,
  LOGIN_ERROR,
  REGISTER_ERROR, REQUEST_LOGIN_GOOGLE
} from './constants'

const initialState = {
  loading: false,
  authInfo: {},
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_LOGIN:
        draft.loading = true
        break
      case LOGIN_SUCCESS:
        draft.authInfo = action.authInfo
        draft.loading = false
        break
      case LOGIN_ERROR:
        draft.loading = false
        draft.authInfo = {}
        break
      case REQUEST_REGISTER:
        draft.loading = true
        break
      case REGISTER_SUCCESS:
        draft.loading = false
        break
      case REGISTER_ERROR:
        draft.loading = false
        break
      case REQUEST_LOGIN_GOOGLE:
        draft.loading = false
        break
      default:
        return state
    }
  })

export default reducer
