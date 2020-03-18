import _ from 'lodash'
import { Select } from 'antd'
import React from 'react'

export const getRoles = state => _.get(state, 'role.roles', [])
export const getRoleOptions = state => {
  const roles = getRoles(state)

  if (_.isEmpty(roles)) {
    return roles
  }

  const { Option } = Select

  return roles.map((role) => (
    <Option
      value={role.id}
      key={`role-key-${role.id}`}
    >{role.name}
    </Option>
  ))
}
