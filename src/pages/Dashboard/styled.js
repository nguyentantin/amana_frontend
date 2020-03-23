import styled from 'styled-components'
import { layout, space } from 'styled-system'

export const ScrollContainer = styled.div`
  overflow: auto;
  ${layout}
  ${space}
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
