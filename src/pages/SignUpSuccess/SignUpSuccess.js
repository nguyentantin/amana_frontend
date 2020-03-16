import React from 'react'
import { Button, Result } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

class SignUpSuccess extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Result
          status="success"
          title="A verification link has been sent to your email account"
          subTitle="Please click on the link that has just been sent to your email account to verify your email add continues the registration process."
          extra={[
            <Link to='/sign-in' key='login'>
              <Button type="primary">
                Continue
              </Button>,
            </Link>
          ]}
        />
      </Wrapper>
    )
  }
}

export default SignUpSuccess
