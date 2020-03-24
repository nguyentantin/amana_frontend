import React from 'react'
import { Avatar } from 'antd'

import { getFirstCapitalizedLetter } from '../../utils/helpers'

const AvatarBox = (props) => {
  return (
    <React.Fragment>
      <Avatar {...props}>
        {getFirstCapitalizedLetter(props.name)}
      </Avatar>
    </React.Fragment>
  )
}

export default AvatarBox
