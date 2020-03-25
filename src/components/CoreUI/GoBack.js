import React from 'react'
import { Button, Icon } from 'antd'
import { withRouter } from 'react-router'
import { compose } from 'recompose'

import { Box } from '../../styles/utility'

class GoBack extends React.Component{
  render() {
    const { history } = this.props

    return (
      <div>
        <Box>
          <Button type='link' onClick={() => history.goBack()} size={'large'}>
            <Icon type="left" />
            <span style={{marginLeft: 0}}>Back</span>
          </Button>
        </Box>
      </div>
    )
  }
}

export default compose(
  withRouter
)(GoBack)
