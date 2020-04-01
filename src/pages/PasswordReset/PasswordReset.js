import React from 'react'
import { Row, Form, Button, Divider } from 'antd'
import { Field, reduxForm, reset, stopSubmit, change } from 'redux-form'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

import { Box } from '../../styles/utility'
import { AInput } from '../../components/FormUI'
import { confirmPassword, email, required } from '../../utils/validations'
import logo from '../../assets/images/App_logo.png'
import * as Styled from '../PasswordSendMail/styled'
import AuthRequest from '../../api/Request/AuthRequest'
import { success } from '../../utils/toastr'
import { HTTP_CODE } from '../../config/constants'

@observer
class PasswordReset extends React.Component {
  @observable loading = false

  @action reset(values) {
    const {dispatch, history} = this.props
    this.loading = true

    AuthRequest
      .resetPassword(values)
      .then(() => {
        success('Your password has been changed successfully.')
        history.push('/sign-in')
        dispatch(reset('PasswordResetForm'))
      })
      .catch((e) => {
        if (e.statusCode === HTTP_CODE.UNPROCESSABLE_ENTITY) {
          dispatch(stopSubmit('PasswordResetForm', _.get(e, 'error', {})))
        }
      })
      .finally(() => {
        this.loading = false
      })
  }

  constructor(props) {
    super(props)

    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    const {dispatch, location} = this.props
    const params = new URLSearchParams(location.search)

    const data = {
      email: decodeURIComponent(params.get('email')),
      token: decodeURIComponent(params.get('token'))
    }

    dispatch(change('PasswordResetForm', 'token', data.token))
    dispatch(change('PasswordResetForm', 'email', data.email))
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <Row>
        <Styled.ContainerWrapper pt={[0, 110]}>
          <Box m='auto' width={[1, 500]} px={[10, 0]}>
            <Styled.CardContent>
              <Styled.LogoWrapper m='auto'>
                <img src={logo} alt="Logo"/>
              </Styled.LogoWrapper>

              <Form layout="vertical" onFinish={handleSubmit(this.reset)}>
                <Field
                  name="token"
                  component='input'
                  type="hidden"
                />

                <Field
                  label="Email"
                  name="email"
                  component={AInput}
                  type="email"
                  placeholder="Please enter your email."
                  size='large'
                  disabled={true}
                  validate={[required, email]}
                />

                <Field
                  label="Password"
                  name="password"
                  component={AInput}
                  type="password"
                  placeholder="Please enter new password."
                  size='large'
                  validate={[required]}
                />

                <Field
                  label="Password Confirmation"
                  name="password_confirm"
                  component={AInput}
                  type="password"
                  placeholder="Please enter password confirmation."
                  size='large'
                  validate={[required, confirmPassword]}
                />

                <Button
                  block
                  type="primary"
                  size='large'
                  htmlType="submit"
                  loading={this.loading}
                >
                  Reset Password
                </Button>

                <Divider/>

                <Box m="auto" textAlign='center'>
                  <Link to='/sign-in' style={{display: 'block', marginTop: '15px'}}>Return to login.</Link>
                </Box>
              </Form>
            </Styled.CardContent>
          </Box>
        </Styled.ContainerWrapper>
      </Row>
    )
  }
}

const enhance = compose(
  connect(),
  withRouter,
  reduxForm({
    form: 'PasswordResetForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    updateUnregisteredFields: true
  })
)


export default enhance(PasswordReset)
