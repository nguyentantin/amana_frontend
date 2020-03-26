import styled from 'styled-components'
import { space } from 'styled-system'
import { Card } from 'antd'
import { container } from '../../styles/mixins'

export const StyleContainer = styled.div`
  ${container.centerBox}
`

export const StyleCard = styled(Card)`
  padding: 26px !important;
  border-radius: 10px !important;
  .ant-card-body {
    padding: 0;
  }
`

export const StyleLink = styled.div`
  text-align: center;
  ${space}
`
