import {makeActionCreator} from '../../index'
import {FETCH_EXTERNAL_MEMBERS, FETCH_EXTERNAL_MEMBERS_SUCCESS} from './constants'

export const fetchExternalMembers = makeActionCreator(FETCH_EXTERNAL_MEMBERS, 'project')
export const fetchExternalMembersSuccess = makeActionCreator(FETCH_EXTERNAL_MEMBERS_SUCCESS, 'data')
