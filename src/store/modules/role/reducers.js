import produce from 'immer'
import {
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
} from './constants'

const initialState = {
  roles: []
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_ROLES:
        break
      case FETCH_ROLES_SUCCESS:
        draft.roles = action.data
        break
      default:
        return state
    }
  })

export default reducer
