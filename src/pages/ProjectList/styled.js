import styled from 'styled-components'
import { space } from 'styled-system'
import { Avatar, Card } from 'antd'

import { container } from '../../styles/mixins'

export const StyleContainer = styled.div`
  padding-top: 40px;
  ${container.centerBox}
  .ant-table-thead {
    display: none;
  }
`

export const StyleAvatar = styled(Avatar)`
  ${space}
`

export const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyleCard = styled(Card)`
  ${space}
  padding: 12px !important;
  .ant-card-body {
    padding: 0;
  }
`

export const StyleLabel = styled.label`
  position: relative;
  top: 6px;
`