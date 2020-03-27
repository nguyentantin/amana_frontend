import styled from 'styled-components'
import { Card } from 'antd'

import { container } from './mixins'

const ContainerWrap = styled(Card)`
  ${container.centerBox}
  padding: 12px !important;
  .ant-card-body {
    padding: 0;
  }
`

export default ContainerWrap
