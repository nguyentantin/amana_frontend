import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Col, Row, Card, Form, Button } from 'antd'

import { AInput } from '../../components/FormUI'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'

const key = 'auth'

class SignInPage extends React.PureComponent {
  render() {
    return (
      <Row style={{marginTop: '40px'}}>
        <Col span={12}/>
        <Col span={10}>
          <Card bordered={false}>
            <Form>
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

              <div style={{textAlign: 'center'}}>
                <Button type="primary" size='large'>Sign-In</Button>
              </div>
            </Form>
          </Card>
        </Col>
        <Col span={2}/>
      </Row>
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

