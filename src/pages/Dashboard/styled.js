import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { layout, space } from 'styled-system'
import styledSystem from './../../styles/styledSystem';

export const ScrollContainer = styled.div`
  overflow: auto;
  ${layout}
  ${space}
  .ant-list-item-extra {
    margin-bottom: 0 !important;
  }
`

export const ListBuildContainer = styled(ScrollContainer)`
  .ant-list-vertical .ant-list-item-extra {
    margin-left: 0px;
    text-align: right;
  }
`

export const TextMute = styled.p`
  color: #CCC;
`

export const StyleLink = styledSystem(styled(Link)`
  span {
    font-size: 24px !important;
    margin-right: 4px;
  }
`)
