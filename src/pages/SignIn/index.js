import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Card, Form, Button } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'
import { ContainerRow, AuthButton } from './styled'
import { required, email } from '../../utils/validations'
import { requestLogin } from '../../store/modules/auth/actions'

class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(user) {
    const {requestLogin} = this.props

    requestLogin(user)
  }

  render() {
    const {handleSubmit, loading} = this.props

    return (
      <ContainerRow className="container">
        <Col span={12}>
          <h1 className="row-title">Log in<br/>
            <small>to Build Automation</small>
          </h1>

          <AuthButton>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="github" size='large'>
                Log in with Github
              </Button>
            </Col>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" icon="google" size='large'>
                Log in with Google
              </Button>
            </Col>
            <Col span={20} className="auth_button col-sm-10">
              <Button type="primary" shape="round" size='large'>
                Log in with SAML Authentication
              </Button>
            </Col>
          </AuthButton>
        </Col>

        <Col span={12} className="row-two">
          <Card bordered={false}>
            <Form layout="vertical" onSubmit={handleSubmit(this.onSubmit)}>
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
              <div style={{textAlign: 'center', paddingLeft: '45px'}}>
                <span style={{display: 'block', marginBottom: '15px'}}>
                  <Link to='/'>Forgot your password?</Link>
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

const mapDispatchToProps = {requestLogin}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
  reduxForm({
    form: 'SignInForm'
  })
)(SignInPage)

