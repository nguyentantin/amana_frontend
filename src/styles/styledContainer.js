import styled from 'styled-components'
import { Card } from 'antd'

import { container } from './mixins'

const StyledContainer = styled(Card)`
  ${container.centerBox}
  padding: 12px !important;
  .ant-card-body {
    padding: 0;
  }
  .project-list {
    .ant-table-thead {
      display: none;
    }
  }
  .app-build, .project-detail, .project-setting {
    padding-bottom: 40px;
  }
`

export default StyledContainer
