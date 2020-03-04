import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Card, Form, Button } from 'antd'
import { Link } from 'react-router-dom'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { ContainerRow, AuthButton } from './styled'
import { required, email, password } from '../../utils/validations'

const key = 'auth'

class SignInPage extends React.PureComponent {
  render() {
    return (
      <ContainerRow className="container">
        <Col span={12}>
          <h1 className="row-title">Log in<br/>
            <small>to Build Automation</small>
          </h1>
          <AuthButton>
            <Col span={20} id="github_login_button" className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="github" size='large'>
                Log in with Github
              </Button>
            </Col>
            <Col span={20} id="google_login_button" className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="google" size='large'>
                Log in with Google
              </Button>
            </Col>
            <Col span={20} id="saml_login_button" className="auth_button col-sm-10">
              <Button type="primary" shape="round" size='large'>
                Log in with SAML Authentication
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
                validate={[required, email]}
              />

              <Field
                label="Password"
                name="password"
                component={AInput}
                type='password'
                placeholder="Please enter password"
                size='large'
                validate={[required, password]}
              />
              <div style={{textAlign: 'center', paddingLeft: '45px'}}>
                <span style={{display: 'block', marginBottom: '15px'}}>
                  <Link to='/'>Forgot your password?</Link>
                </span>

                <Button style={{width: '300px'}} shape="round" type="primary" size='large'>Sign-In</Button>
                <Link to='/sign-up' style={{display: 'block', marginTop: '15px'}}>No account? Sign up here.</Link>
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
    form: 'SignInForm'
  })
)(SignInPage)

