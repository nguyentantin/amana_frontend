import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Col, Row, Typography } from 'antd'
import QRCode from 'qrcode.react'
import _ from 'lodash'

import { LinkDownload, marginRight } from './styled'
import { Box } from '../../styles/utility'
import { EnvTag } from '../../components/CoreUI'

const {Text} = Typography

class CurrentBuildInfo extends React.PureComponent {
  render() {
    const {build, url} = this.props

    return (
      <Fragment>
        <Row>
          <Col xs={10} md={3}>
            <QRCode value={url}/>
          </Col>

          <Col xs={14} md={6}>
            <Box>
              <Text strong>Commit: </Text>
              <Text>{_.get(build, 'commitChanges', '')}</Text>
            </Box>
            <Box>
              <Text strong>Build Number: </Text>
              <Text>{_.get(build, 'buildNumber', '')}</Text>
            </Box>
            <Box>
              <Text strong>Env: </Text>
              <EnvTag type={build.env}/>
            </Box>

            <Box>
              <Text strong>Version: </Text>
              <Text style={{marginLeft: '5px'}}>1.0</Text>
            </Box>
            <Button className="btn-right" type="primary" style={marginRight}>
              <Icon type="download"/>
              <LinkDownload href={url} download> Download </LinkDownload>
            </Button>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

CurrentBuildInfo.propTypes = {
  build: PropTypes.object,
  url: PropTypes.string
}

export default CurrentBuildInfo
