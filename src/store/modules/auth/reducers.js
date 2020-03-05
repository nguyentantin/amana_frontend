import produce from 'immer'
import { LOGIN_SUCCESS, LOGIN_ERROR } from './constants'

const initialState = {
  loading: false,
  error: false,
  currentUser: {},
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.loading = true
        draft.error = false
        draft.userData.repositories = false
        break

      case LOGIN_ERROR:
        draft.loading = true
        draft.error = false
        draft.userData.repositories = false
        break

      default:
        return state
    }
  })

export default reducer
