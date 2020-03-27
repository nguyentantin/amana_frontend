import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Card, Form, Button } from 'antd'
import GoogleLogin from 'react-google-login'
import _ from 'lodash'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { ContainerRow, AuthButton, StyleLink } from '../SignIn/styled'
import StyleContainer from '../../styles/styledContainer'
import { required, email, confirmPassword } from '../../utils/validations'
import { requestLoginGoogle, requestRegister } from '../../store/modules/auth/actions'
import ColStyle from '../../styles/colStyle'
import { GOOGLE_CLIENT_ID } from '../../config/constants'
import { error } from '../../utils/toastr'


class SignUpPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(user) {
    const {requestRegister} = this.props

    requestRegister(user)
  }

  googleSuccessCallback(response) {
    const { requestLoginGoogle } = this.props
    const { accessToken } = response

    requestLoginGoogle({ accessToken })
  }

  googleFailureCallback(response) {
    error('Cannot sign up with google')
  }

  render() {
    const {handleSubmit, loading} = this.props

    return (
      <StyleContainer>
        <ContainerRow>
          <Col xs={24} md={12}>
            <h1 className="row-title">Create your account<br/>
              <small>with Build Automation</small>
            </h1>
            <AuthButton>
              <Col xs={24} md={20} className="auth_button col-sm-10">
                <Button type="primary" shape="round" icon="github" size='large' disabled>
                  Sign up with GitHub
                </Button>
              </Col>
              <ColStyle xs={24} md={20} className="auth_button col-sm-10">
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Sign up with Google"
                  onSuccess={response => this.googleSuccessCallback(response)}
                  onFailure={response => this.googleFailureCallback(response)}
                  cookiePolicy={'single_host_origin'}
                  className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg btn-google"
                />
              </ColStyle>
              <Col xs={24} md={20} className="auth_button col-sm-10">
                <Button type="primary" shape="round" size='large' icon='mail' disabled>
                  Sign up with Email
                </Button>
              </Col>
            </AuthButton>
          </Col>
          <Col xs={24} md={12} className="row-two">
            <Card bordered={false}>
              <Form style={{padding: 12}} layout="vertical" onFinish={handleSubmit(this.onSubmit)}>
                <Field
                  label="Name"
                  name="name"
                  component={AInput}
                  type="text"
                  placeholder="Please enter your name"
                  size='large'
                  validate={[required]}
                />
                <Field
                  label="Email"
                  name="email"
                  component={AInput}
                  type="email"
                  placeholder="Please enter email"
                  size='large'
                  validate={[required, email]}
                />

                <Field
                  label="Password"
                  name="password"
                  component={AInput}
                  type='password'
                  placeholder="Please enter password"
                  size='large'
                  validate={[required]}
                />

                <Field
                  label="Confirm Password"
                  name="password_confirm"
                  component={AInput}
                  type='password'
                  placeholder="Please enter password confirmation"
                  size='large'
                  validate={[required, confirmPassword]}
                />

                <StyleLink pl={[0, 44]}>
                  <Button
                    style={{width: '300px'}}
                    shape="round"
                    type="primary"
                    size='large'
                    htmlType="submit"
                    loading={loading}
                  >
                    Sign-up
                  </Button>
                </StyleLink>
              </Form>
            </Card>
          </Col>
        </ContainerRow>
      </StyleContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: _.get(state, 'auth.loading', false)
  }
}

export default compose(
  connect(mapStateToProps, {requestRegister, requestLoginGoogle}),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
  reduxForm({
    form: 'SignUpForm'
  })
)(SignUpPage)

