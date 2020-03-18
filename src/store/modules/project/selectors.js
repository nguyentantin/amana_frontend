import _ from 'lodash'
import { Select } from 'antd'
import React from 'react'

export const getExternalMembers = state => _.get(state, 'project.externalMembers', [])
export const getListMemberOptions = state => {
  const members = getExternalMembers(state)

  if (_.isEmpty(members)) {
    return members
  }

  const { Option } = Select

  return members.map((member) => (
    <Option
      value={member.id}
      key={`member-key-${member.id}`}
    >{member.name}
    </Option>
  ))
}
