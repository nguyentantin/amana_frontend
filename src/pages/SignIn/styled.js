import styled from 'styled-components'
import { space } from 'styled-system'
import { Row } from 'antd'
import { container } from '../../styles/mixins'

export const ContainerRow = styled(Row)`
  ${container.centerBox}
  .row-two {
    display: flex !important;
    margin-top: 20px;
    .ant-card {
      width: 100%;
      background-color: whitesmoke;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
      box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
    }
    .ant-form-item-label {
      margin-top: 8px;
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