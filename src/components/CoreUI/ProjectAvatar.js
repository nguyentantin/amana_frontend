import React from 'react'
import { Avatar } from 'antd'
import _ from 'lodash'

import { ShowIf } from '../Utils'

import { getFirstCapitalizedLetter } from '../../utils/helpers'

const ProjectAvatar = ({project, fontSize, ...rest}) => {
  const style = {}
  if (_.isNull(project.avatar)) {
    style.backgroundColor = _.get(project, 'color')
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
    <ShowIf condition={!_.isEmpty(project)}>
      <ShowIf condition={!_.isNull(project.avatar)}>
        <Avatar {...props} src={_.get(project, 'avatar')}/>
      </ShowIf>

      <ShowIf condition={_.isNull(project.avatar)}>
        <Avatar {...props}>
          {getFirstCapitalizedLetter(project.name)}
        </Avatar>
      </ShowIf>
    </ShowIf>
  )
}

export default ProjectAvatar
