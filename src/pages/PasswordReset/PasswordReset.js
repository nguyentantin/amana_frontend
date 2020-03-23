import React from 'react'
import { Row, Form, Button, Card, Divider } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'

import { Box } from '../../styles/utility'
import { withRouter } from 'react-router'
import { AInput } from '../../components/FormUI'
import { email, required } from '../../utils/validations'
import logo from '../../assets/images/App_logo.png'
import * as Styled from '../PasswordSendMail/styled'

class PasswordReset extends React.Component {
  render() {
    const {handleSubmit} = this.props
    return (
      <Row>
        <Styled.ContainerWrapper pt={[50, 110]}>
          <Styled.LogoWrapper m='auto'>
            <img src={logo} alt="Logo"/>
          </Styled.LogoWrapper>

          <Box m='auto' mt={40} width={[1, 500]} px={[10, 0]}>
            <Card>
              <Form layout="vertical" onSubmit={handleSubmit}>
                <Field
                  label="Email"
                  name="email"
                  component={AInput}
                  type="email"
                  placeholder="Please enter your email."
                  size='large'
                  validate={[required, email]}
                />

                <Field
                  label="Password"
                  name="password"
                  component={AInput}
                  type="email"
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
                  validate={[required]}
                />

                <Button
                  block
                  type="primary"
                  size='large'
                  htmlType="submit"
                >
                  Reset Password
                </Button>

                <Divider/>

                <Box m="auto" textAlign='center'>
                  <Link to='/sign-in' style={{display: 'block', marginTop: '15px'}}>Return to login.</Link>
                </Box>
              </Form>
            </Card>
          </Box>
        </Styled.ContainerWrapper>
      </Row>
    )
  }
}

const enhance = compose(
  withRouter,
  reduxForm({
    form: 'PasswordSendMailForm'
  })
)


export default enhance(PasswordReset)
