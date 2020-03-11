import styled from 'styled-components';
import { Col } from 'antd'

const ColStyle = styled(Col)`
  .btn-google {
    display: block !important;
    color: #fff !important;
    background-color: #fa8c16 !important;
    border-color: #fa8c16 !important;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12) !important;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045) !important;
    padding: 0 16px !important;
    border-radius: 32px !important;
    text-align: center !important;
    > div {
    display: none;
    }
  }
`

export default ColStyle;