import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Card, Form, Button } from 'antd'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { ContainerRow, AuthButton } from './styled'
import { required, email, confirmPassword } from '../../utils/validations'
import { requestRegister } from '../../store/modules/auth/actions'

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
    const {handleSubmit} = this.props

    return (
      <ContainerRow className="container">
        <Col span={12}>
          <h1 className="row-title">Create your account<br/>
            <small>with DeployGate</small>
          </h1>
          <AuthButton>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="github" size='large'>
                Sign up with GitHub
              </Button>
            </Col>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="google" size='large'>
                Sign up with Google
              </Button>
            </Col>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" size='large' icon='mail'>
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
                <Button style={{width: '300px'}} shape="round" type="primary" size='large' htmlType="submit">Sign-up</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </ContainerRow>
    )
  }
}

export default compose(
  connect(null, {requestRegister}),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
  reduxForm({
    form: 'SignUpForm'
  })
)(SignUpPage)

