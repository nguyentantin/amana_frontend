import React from 'react'
import _ from 'lodash'
import { Tag } from 'antd'

import { PROJECT_ENV, PROJECT_ENV_COLOR } from '../../config/constants'

class EnvTag extends React.Component{
  render() {
    const { env } = this.props
    const key = _.findKey(PROJECT_ENV, (value) => value === env)

    return (
      <Tag color={PROJECT_ENV_COLOR[key]}>{key}</Tag>
    );
  }
}

export default EnvTag
