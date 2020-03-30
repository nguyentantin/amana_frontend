import styled from 'styled-components'
import { space } from 'styled-system'
import { Row } from 'antd'

export const ContainerRow = styled(Row)`
  .row-one {
    margin: auto 0;
    top: -13px;
  }
  .row-two {
    display: flex !important;
    border-left: 1px solid #e3e3e3;
    .ant-card {
      width: 100%;
    }
    .ant-form-item-label {
      margin-top: 8px;
    }
  }
  @media screen and (max-width: 600px) {
    .row-one {
      top: 0;
    }
    .row-two {
      border: 0;
    }
  }
  .row-title {
    font-size: 36px;
    margin-bottom: 0;
    small {
    color: #777777;
  }
`

export const AuthButton = styled.div`
  .auth_button {
    margin-top: 25px;
    .ant-btn {
      width: 100%;
      display: block;
    }
  }
`

export const StyleLink = styled.div`
  text-align: center;
  ${space}
`