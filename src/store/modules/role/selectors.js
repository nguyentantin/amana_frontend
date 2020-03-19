import _ from 'lodash'

export const getRoles = state => _.get(state, 'role.roles', [])
