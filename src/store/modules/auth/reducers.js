import produce from 'immer'
import { LOGIN_SUCCESS } from './constants'

const initialState = {
  authInfo: {},
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.authInfo = action.authInfo
        break
      default:
        return state
    }
  })

export default reducer
