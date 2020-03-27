import styled from 'styled-components'
import { Select, List } from 'antd'

import styledSystem from '../../styles/styledSystem'

export const StyleList = styled(List.Item)`
  @media screen and (max-width: 600px) {
    display: block !important;
    .ant-list-item-meta {
      margin-bottom: 8px;
    }
  }
`

export const StyleSelect = styledSystem(styled(Select)`
  width: 500px !important;
  margin-right: 10px !important;
  @media screen and (max-width: 600px) {
    width: 100% !important;
    margin-bottom: 4px !important;
  }
`)
