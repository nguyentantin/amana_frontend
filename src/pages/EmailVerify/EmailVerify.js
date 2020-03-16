import React from 'react'
import { observer } from 'mobx-react'
import { Spin, Result, Button, Card, message } from 'antd'
import { action, observable } from 'mobx'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import AuthRequest from '../../api/Request/AuthRequest'
import { ShowIf } from '../../components/Utils'
import * as Styled from './styled'

@observer
class EmailVerify extends React.Component {
  @observable verifying = false
  @observable isSuccess = false
  @observable isFailed = false
  @observable loading = false

  @action
  requestVerifyEmail(params) {
    this.verifying = true
    AuthRequest
      .verifyEmail(params)
      .then(() => {
        this.verifying = false
        this.isSuccess = true
      })
      .catch(() => {
        this.verifying = false
        this.isFailed = true
      })
  }

  @action
  requestSendMailVerify(params) {
    this.loading = true
    AuthRequest
      .sendMailVerify(params)
      .then(() => {
        message.success('Successful! Send mail verify', 5)
        this.loading = false
      })
      .catch(() => {
        message.error('Some thing went wrong!')
        this.loading = false
      })
  }

  constructor(props) {
    super(props)

    this.sendMail = this.sendMail.bind(this)
  }

  componentDidMount() {
    const {location} = this.props
    const params = new URLSearchParams(location.search)

    const data = {
      email: decodeURIComponent(params.get('email')),
      token: decodeURIComponent(params.get('token'))
    }
    this.requestVerifyEmail(data)
  }

  sendMail() {
    const {location} = this.props
    const params = new URLSearchParams(decodeURI(location.search))

    this.requestSendMailVerify({email: params.get('email')})
  }

  render() {
    return (
      <Styled.Wrapper>
        <ShowIf condition={this.verifying}>
          <Spin tip="Email Verifying..." size='large'>
          </Spin>
        </ShowIf>

        <ShowIf condition={this.isSuccess}>
          <Card>
            <Result
              status="success"
              title="Successful"
              subTitle="Your email address has been successfully verified."
              extra={[
                <Link to='sign-in' key='login'>
                  <Button type="primary">
                    Continue
                  </Button>,
                </Link>
              ]}
            />
          </Card>
        </ShowIf>

        <ShowIf condition={this.isFailed}>
          <Card>
            <Result
              status="warning"
              title="Email verification failed"
              subTitle="May be your token is expired"
              extra={[
                <Button type="primary" key='send-mail' loading={this.loading} onClick={this.sendMail}>
                  Send Again
                </Button>,
              ]}
            />
          </Card>
        </ShowIf>
      </Styled.Wrapper>
    )
  }
}

export default withRouter(EmailVerify)
