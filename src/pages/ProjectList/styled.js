import styled from 'styled-components'
import { space } from 'styled-system'
import { Avatar, Card, Col } from 'antd'

import { container } from '../../styles/mixins'
import styledSystem from '../../styles/styledSystem'

export const StyleContainer = styled.div`
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
  padding: 12px !important;
  .ant-card-body {
    padding: 0;
  }
`

export const StyleUpload = styledSystem(styled(Col)`
  .ant-upload-picture-card-wrapper {
    width: auto;
  }
  .ant-upload.ant-upload-select-picture-card {
    margin: 0;
  }
`)
