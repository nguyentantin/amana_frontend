import styled from 'styled-components'
import { Form } from 'antd'

export const StyleForm = styled(Form)`
  justify-content: flex-end;
  align-items: center;
  margin: 15px 0 30px !important;
  @media screen and (max-width: 600px) {
    justify-content: flex-start;
    .ant-form-item {
      width: 100%;
      margin-bottom: 15px !important;
      .ant-picker {
        display: inherit;
      }
    }
    .ant-btn {
      margin: 8px auto 0;
      padding: 0 20%;
    }
  }
`

export const Page = styled.div`
  .ant-table thead {
    display: none;
  }
`
