import React from 'react'
import { compose } from 'recompose'
import { Field, initialize, reduxForm, stopSubmit } from 'redux-form'
import { Button, Form, Divider, Col, Row, Typography } from 'antd'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import { connect } from 'react-redux'
import _ from 'lodash'

import { AInput } from '../../components/FormUI'
import { StyleContainer, StyleCard, StyleLink } from './styled'
import { confirmPassword, email, required } from '../../utils/validations'
import UserRequest from '../../api/Request/UserRequest'
import UserInfoCard from '../Dashboard/UserInfoCard'
import { Box } from '../../styles/utility'
import { UserAvatar } from '../../components/CoreUI'
import LocalStorage from '../../utils/localStorage'
import PopupSelectAvatar from './PopupSelectAvatar'
import { HTTP_CODE } from '../../config/constants'

@observer
class ProfilePage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleModal = this.onToggleModal.bind(this)
  }

  @observable profile = {}
  @observable loading = false
  @observable updating = false
  @observable visible = false

  @action onToggleModal() {
    this.visible = !this.visible
  }

  @action fetchProfile() {
    const {dispatch} = this.props
    this.loading = true

    UserRequest
      .profile()
      .then((data) => {
        this.profile = data
        LocalStorage.saveAuthInfo(data)
        dispatch(initialize('ProfileForm', this.profile))
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action onSubmit(values) {
    const {dispatch} = this.props
    this.updating = true
    UserRequest
      .updateProfile(values)
      .then(() => {
        this.fetchProfile()
      })
      .catch((e) => {
        if (e.statusCode === HTTP_CODE.UNPROCESSABLE_ENTITY) {
          dispatch(stopSubmit('ProfileForm', _.get(e, 'error', {})))
        }
      })
      .finally(() => {
        this.updating = false
      })
  }

  componentDidMount() {
    this.fetchProfile()
  }


  render() {
    const {handleSubmit} = this.props

    return (
      <StyleContainer>
        <Row gutter={[16, 24]} justify='center'>
          <Col span={6} className="gutter-row">
            <UserInfoCard/>
          </Col>

          <Col span={18} className="gutter-row">
            <StyleCard loading={this.loading}>
              <Typography.Title level={2}>Profile</Typography.Title>
              <Divider/>

              <Row justify='center'>
                <Col span={16}>
                  <Form layout='vertical' onFinish={handleSubmit(this.onSubmit)}>
                    <Box textAlign='center' mb={3}>
                      <UserAvatar size={80} user={toJS(this.profile)} fontSize={40}/>
                      <Button size="small" style={{marginLeft: 16, verticalAlign: 'middle'}}
                              onClick={this.onToggleModal}>
                        Change
                      </Button>
                    </Box>

                    <Field
                      label="Name"
                      name="name"
                      component={AInput}
                      type="text"
                      placeholder="Please enter name"
                      size='large'
                      validate={[required]}
                    />

                    <Field
                      label="Email Address"
                      name="email"
                      component={AInput}
                      type="email"
                      placeholder="Please enter email"
                      disabled={true}
                      size='large'
                      validate={[required, email]}
                    />

                    <Field
                      label="Current Password"
                      name="currentPassword"
                      component={AInput}
                      type="password"
                      placeholder="Please enter current password"
                      size='large'
                    />

                    <Field
                      label="New Password"
                      name="password"
                      component={AInput}
                      type="password"
                      placeholder="Please enter new password"
                      size='large'
                    />

                    <Field
                      label="Password Confirmation"
                      name="passwordConfirmation"
                      component={AInput}
                      type="password"
                      placeholder="Please enter password confirmation"
                      validate={[confirmPassword]}
                      size='large'
                    />

                    <StyleLink m={3}>
                      <Button
                        style={{width: '300px'}}
                        type="primary"
                        size='large'
                        htmlType="submit"
                        loading={this.updating}
                      >
                        Save Changes
                      </Button>
                    </StyleLink>
                  </Form>
                </Col>
              </Row>
            </StyleCard>
          </Col>
        </Row>

        <PopupSelectAvatar visible={this.visible} onToggle={this.onToggleModal}/>
      </StyleContainer>
    )
  }
}

export default compose(
  connect(),
  reduxForm({
    form: 'ProfileForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    updateUnregisteredFields: true
  })
)(ProfilePage)

