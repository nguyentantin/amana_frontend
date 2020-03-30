import styled from 'styled-components'
import { Card } from 'antd'

import { container } from './mixins'
import styledSystem from './styledSystem'

const ContainerWrap = styledSystem(styled(Card)`
  ${container.centerBox}
  padding: 12px;
  .ant-card-body {
    padding: 0;
  }
`)

export default ContainerWrap
