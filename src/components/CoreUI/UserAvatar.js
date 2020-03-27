import React from 'react'
import { Avatar } from 'antd'
import _ from 'lodash'

import { ShowIf } from '../Utils'
import avatar1 from '../../assets/avatar/1.png'
import { getFirstCapitalizedLetter } from '../../utils/helpers'

const UserAvatar = ({user, fontSize, ...rest}) => {
  const style = {}
  if (_.isEmpty(user.avatarId)) {
    style.backgroundColor = _.get(user, 'color')
  }

  if (fontSize) {
    style.fontSize = fontSize
  }

  const props = {
    ...rest,
    style: {
      ...rest.style,
      ...style
    }
  }

  return (
    <ShowIf condition={!_.isEmpty(user)}>
      <ShowIf condition={!_.isEmpty(user.avatarId)}>
        <Avatar {...props} src={avatar1}/>
      </ShowIf>

      <ShowIf condition={_.isEmpty(user.avatarId)}>
        <Avatar {...props}>
          {getFirstCapitalizedLetter(user.name)}
        </Avatar>
      </ShowIf>
    </ShowIf>
  )
}

export default UserAvatar
