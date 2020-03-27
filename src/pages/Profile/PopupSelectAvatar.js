import React from 'react'
import { Row, Col, Button } from 'antd'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

import { Box } from '../../styles/utility'
import * as Styled from './styled'

import ModalStyle from '../../styles/modal'
import { UserAvatar } from '../../components/CoreUI'
import avatarList from '../../assets/avatar'

@observer
class PopupSelectAvatar extends React.PureComponent {
  @observable selected = null

  @action onSelect(id) {
    this.selected = id
  }

  constructor(props) {
    super(props)

    this.choose = this.choose.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  isActive(id) {
    const {user} = this.props

    const avatarId = _.get(user, 'avatarId', null)
    if (!_.isNull(this.selected)) {
      return this.selected === id
    }

    return avatarId === id
  }

  choose() {
    const {onChoose, onToggle} = this.props
    onChoose(this.selected)
    onToggle()
  }

  @action onCancel() {
    const {onToggle} = this.props

    this.selected = null
    onToggle()
  }

  user() {
    const {user} = this.props
    const avatarId = _.get(user, 'avatarId', null)
    if (!_.isNull(this.selected)) {
      return {
        ...user,
        avatarId: this.selected
      }
    }


    return {
      ...user,
      avatarId
    }
  }

  render() {
    const {visible, onToggle} = this.props

    const user = this.user()

    return (
      <Styled.AvatarBox textAlign='center' mb={3}>
        <UserAvatar size={80} user={user} fontSize={40}/>

        <Button size="small" style={{marginLeft: 16, verticalAlign: 'middle'}}
                onClick={onToggle}>
          Change
        </Button>

        <ModalStyle
          visible={visible}
          okText="Choose"
          cancelText='Close'
          onCancel={this.onCancel}
          width='700px'
          okButtonProps={{
            onClick: this.choose
          }}
        >
          <Row justify='start'>
            {
              _.map(avatarList, (avatar) => {
                const isActive = this.isActive(avatar.id)
                const style = {}

                if (isActive) {
                  style.border = '2px solid #fa8c16'
                }

                return (
                  <Col span={8} key={avatar.id}>
                    <Box p={3} textAlign='center'>
                      <Styled.AvatarSelect
                        size={80}
                        src={avatar.imgSrc}
                        onClick={() => this.onSelect(avatar.id)}
                        style={style}
                      />
                    </Box>
                  </Col>
                )
              })
            }
          </Row>
        </ModalStyle>
      </Styled.AvatarBox>
    )
  }
}

export default PopupSelectAvatar
