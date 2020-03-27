import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Card, Col, Form } from 'antd'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import _ from 'lodash'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { AuthButton, ContainerRow, StyleLink } from './styled'
import StyledContainer from '../../styles/styledContainer'
import { email, required } from '../../utils/validations'
import { requestLogin, requestLoginGoogle } from '../../store/modules/auth/actions'
import ColStyle from '../../styles/colStyle'
import { GOOGLE_CLIENT_ID } from '../../config/constants'
import { error } from '../../utils/toastr'


class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(user) {
    const {requestLogin} = this.props

    requestLogin(user)
  }

  googleSuccessCallback(response) {
    const { requestLoginGoogle } = this.props
    const { accessToken } = response

    requestLoginGoogle({ accessToken })
  }

  googleFailureCallback(response) {
    error('Cannot sign in with google')
  }

  render() {
    const {handleSubmit, loading} = this.props

    return (
      <StyledContainer>
        <ContainerRow>
          <Col xs={24} md={12}>
            <h1 className="row-title">Log in<br/>
              <small>to Build Automation</small>
            </h1>

            <AuthButton>
              <Col xs={24} md={20} className="auth_button col-sm-10">
                <Button type="primary" shape="round" size='large' disabled>
                  Log in with GitHub
                </Button>
              </Col>

              <ColStyle xs={24} md={20} className="auth_button col-sm-10">
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Log in with Google"
                  onSuccess={response => this.googleSuccessCallback(response)}
                  onFailure={response => this.googleFailureCallback(response)}
                  cookiePolicy={'single_host_origin'}
                  className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg btn-google"
                />
              </ColStyle>

              <Col xs={24} md={20} className="auth_button col-sm-10">
                <Button type="primary" shape="round" size='large' disabled>
                  Log in with SAML Authentication
                </Button>
              </Col>
            </AuthButton>
          </Col>

          <Col xs={24} md={12} className="row-two">
            <Card bordered={false}>
              <Form style={{padding: 12}} layout="vertical" onFinish={handleSubmit(this.onSubmit)}>
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
                <StyleLink pl={[0, 45]}>
                  <span style={{display: 'block', marginBottom: '15px'}}>
                    <Link to='/pwd/send-mail'>Forgot your password?</Link>
                  </span>

                  <Button
                    style={{width: '300px'}}
                    shape="round"
                    type="primary"
                    size='large'
                    htmlType="submit"
                    loading={loading}
                  >
                    Sign-In
                  </Button>
                  <Link to='/sign-up' style={{display: 'block', marginTop: '15px'}}>No account? Sign up here.</Link>
                </StyleLink>
              </Form>
            </Card>
          </Col>
        </ContainerRow>
      </StyledContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: _.get(state, 'auth.loading', false)
  }
}

const mapDispatchToProps = {requestLogin, requestLoginGoogle}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
  reduxForm({
    form: 'SignInForm'
  })
)(SignInPage)

