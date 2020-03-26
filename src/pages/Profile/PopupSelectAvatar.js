import React from 'react'
import { Row, Col, Avatar, Button } from 'antd'
import _ from 'lodash'

import { Box } from '../../styles/utility'
import ModalStyle from '../../styles/modal'
import avatar1 from '../../assets/avatar/1.png'
import avatar2 from '../../assets/avatar/2.png'
import avatar3 from '../../assets/avatar/3.png'
import avatar4 from '../../assets/avatar/4.png'
import avatar5 from '../../assets/avatar/5.png'
import avatar6 from '../../assets/avatar/6.png'
import avatar7 from '../../assets/avatar/7.png'
import avatar8 from '../../assets/avatar/8.png'

export const avatarList = [
  {id: 1, imgSrc: avatar1},
  {id: 2, imgSrc: avatar2},
  {id: 3, imgSrc: avatar3},
  {id: 4, imgSrc: avatar4},
  {id: 5, imgSrc: avatar5},
  {id: 6, imgSrc: avatar6},
  {id: 7, imgSrc: avatar7},
  {id: 8, imgSrc: avatar8}
]

class PopupSelectAvatar extends React.PureComponent {
  render() {
    const {visible, onToggle} = this.props

    return (
      <ModalStyle
        visible={visible}
        okText="Choose"
        cancelText='Close'
        onCancel={onToggle}
        width='700px'
      >
        <Row justify='start'>
          {
            _.map(avatarList, (avatar) => {
              return (
                <Col span={8} key={avatar.id}>
                  <Box p={3} textAlign='center'>
                    <Avatar size={80} key={avatar.id} src={avatar.imgSrc}/>
                  </Box>
                </Col>
              )
            })
          }
        </Row>
      </ModalStyle>
    )
  }
}

export default PopupSelectAvatar
