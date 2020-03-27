import React from 'react'
import { Row, Form, Button, Divider } from 'antd'
import { connect } from 'react-redux'
import { Field, reduxForm, reset, stopSubmit } from 'redux-form'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

import { Box } from '../../styles/utility'
import { withRouter } from 'react-router'
import { AInput } from '../../components/FormUI'
import { email, required } from '../../utils/validations'
import logo from '../../assets/images/App_logo.png'
import * as Styled from './styled'
import AuthRequest from '../../api/Request/AuthRequest'
import { success } from '../../utils/toastr'
import { HTTP_CODE } from '../../config/constants'
import _ from 'lodash'

@observer
class PasswordSendMail extends React.Component {
  @observable loading = false

  @action onSend(values) {
    const {dispatch} = this.props
    this.loading = true

    AuthRequest
      .sendMailResetPassword(values)
      .then(() => {
        success('We have e-mailed your password reset link!')
        dispatch(reset('PasswordSendMailForm'))
      })
      .catch((e) => {
        if (e.statusCode === HTTP_CODE.UNPROCESSABLE_ENTITY) {
          dispatch(stopSubmit('PasswordSendMailForm', _.get(e, 'error', {})))
        }
      })
      .finally(() => {
        this.loading = false
      })
  }

  constructor(props) {
    super(props)

    this.onSend = this.onSend.bind(this)
  }

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

              <Form layout="vertical" onFinish={handleSubmit(this.onSend)}>
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
                  loading={this.loading}
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
  connect(),
  withRouter,
  reduxForm({
    form: 'PasswordSendMailForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    updateUnregisteredFields: true
  })
)


export default enhance(PasswordSendMail)
