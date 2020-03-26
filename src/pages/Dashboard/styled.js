import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { layout, space } from 'styled-system'
import { Card } from 'antd'
import { AvatarBox } from '../../components/CoreUI'

import styledSystem from './../../styles/styledSystem'
import { container } from '../../styles/mixins'

export const StyleContainer = styled.div`
  ${container.centerBox}
`

export const StyleCard = styled(Card)`
  padding: 12px !important;
  .ant-card-body {
    padding: 0;
  }
`

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
  .ant-list-item-main {
    min-width: 150px !important;
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

export const StyleTextMuted = styledSystem(styled.span``)
export const StyleAvatarBox = styledSystem(styled(AvatarBox)``)
