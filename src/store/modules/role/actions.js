import { makeActionCreator } from '../../index'
import { FETCH_ROLES, FETCH_ROLES_SUCCESS } from './constants'

export const fetchRoles = makeActionCreator(FETCH_ROLES)
export const fetchRolesSuccess = makeActionCreator(FETCH_ROLES_SUCCESS)
