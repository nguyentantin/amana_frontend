import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Card, Form, Button } from 'antd'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { ContainerRow, AuthButton } from './styled'

const key = 'auth'

class SignUpPage extends React.PureComponent {
  render() {
    return (
      <ContainerRow className="container">
        <Col span={12}>
          <h1 className="row-title">Create your account<br/>
            <small>with DeployGate</small>
          </h1>
          <AuthButton>
            <Col span={20} id="github_login_button" className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="github" size='large'>
                Sign up with GitHub
              </Button>
            </Col>
            <Col span={20} id="google_login_button" className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="google" size='large'>
                Sign up with Google
              </Button>
            </Col>
            <Col span={20} id="saml_login_button" className="auth_button col-sm-10">
              <Button type="primary" shape="round" size='large' icon='mail'>
                Sign up with Email
              </Button>
            </Col>
          </AuthButton>
        </Col>
        <Col span={12} className="row-two">
          <Card bordered={false}>
            <Form layout="vertical">
              <Field
                label="Email"
                name="email"
                component={AInput}
                type="email"
                placeholder="Please enter email"
                size='large'
              />

              <Field
                label="Password"
                name="password"
                component={AInput}
                type='password'
                placeholder="Please enter password"
                size='large'
              />

              <Field
                label="Confirm Password"
                name="password"
                component={AInput}
                type='password'
                placeholder="Please enter password confirmation"
                size='large'
              />

              <div style={{textAlign: 'center', paddingLeft: '44px'}}>
                <Button style={{width: '300px'}} shape="round" type="primary" size='large'>Sign-up</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </ContainerRow>
    )
  }
}

export default compose(
  injectReducer({key: 'auth', reducer}),
  injectSaga({key, saga}),
  reduxForm({
    form: 'SignUpForm'
  })
)(SignUpPage)

