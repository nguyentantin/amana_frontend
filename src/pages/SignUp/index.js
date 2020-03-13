import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Card, Form, Button } from 'antd'
import GoogleLogin from 'react-google-login'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { ContainerRow, AuthButton } from '../SignIn/styled'
import { required, email, confirmPassword } from '../../utils/validations'
import { requestRegister } from '../../store/modules/auth/actions'
import _ from 'lodash'
import ColStyle from '../../styles/colStyle'

// clientId amana
const clientId = "187145148024-95e46vqvkhfmc1i10075fjr0m0obbdga.apps.googleusercontent.com"

const responseGoogle = (response) => {
  console.log(response);
}

class SignUpPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(user) {
    const {requestRegister} = this.props

    requestRegister(user)
  }

  render() {
    const {handleSubmit, loading} = this.props

    return (
      <ContainerRow>
        <Col span={12}>
          <h1 className="row-title">Create your account<br/>
            <small>with Build Automation</small>
          </h1>
          <AuthButton>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="github" size='large' disabled>
                Sign up with GitHub
              </Button>
            </Col>
            <ColStyle span={20} className="auth_button col-sm-10">
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg btn-google"
              />
            </ColStyle>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" size='large' icon='mail' disabled>
                Sign up with Email
              </Button>
            </Col>
          </AuthButton>
        </Col>
        <Col span={12} className="row-two">
          <Card bordered={false}>
            <Form layout="vertical" onSubmit={handleSubmit(this.onSubmit)}>
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

              <div style={{textAlign: 'center', paddingLeft: '44px'}}>
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
              </div>
            </Form>
          </Card>
        </Col>
      </ContainerRow>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: _.get(state, 'auth.loading', false)
  }
}

export default compose(
  connect(mapStateToProps, {requestRegister}),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
  reduxForm({
    form: 'SignUpForm'
  })
)(SignUpPage)

