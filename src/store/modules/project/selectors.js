import _ from 'lodash'

export const getExternalMembers = state => _.get(state, 'project.externalMembers', [])
