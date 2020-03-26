import React from 'react'
import { Row, Form, Button, Divider } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'

import { Box } from '../../styles/utility'
import { withRouter } from 'react-router'
import { AInput } from '../../components/FormUI'
import { email, required } from '../../utils/validations'
import logo from '../../assets/images/App_logo.png'
import * as Styled from './styled'

class PasswordSendMail extends React.Component {
  render() {
    const {handleSubmit} = this.props
    return (
      <Row>
        <Styled.ContainerWrapper pt={[50, 110]}>
          <Box m='auto' mt={40} width={[1, 500]} px={[10, 0]}>
            <Styled.CardContent>
              <Styled.LogoWrapper m='auto'>
                <img src={logo} alt="Logo"/>
              </Styled.LogoWrapper>

              <Form layout="vertical" onFinish={handleSubmit}>
                <Box textAlign='center' mb={2}>
                  <h2>Can't log in?</h2>
                </Box>

                <Field
                  label="We'll send a recovery link to"
                  name="email"
                  component={AInput}
                  type="email"
                  placeholder="Please enter your email."
                  size='large'
                  validate={[required, email]}
                />

                <Button
                  block
                  type="primary"
                  size='large'
                  htmlType="submit"
                >
                  Send recovery link
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
  withRouter,
  reduxForm({
    form: 'PasswordSendMailForm'
  })
)


export default enhance(PasswordSendMail)
