import styled from 'styled-components'
import { space } from 'styled-system'

import styledSystem from '../../styles/styledSystem'
import { AvatarBox } from '../../components/CoreUI'

export const Page = styled.div`
  .ant-table thead {
    display: none;
  }
`

export const StyleAvatar = styled(AvatarBox)`
  ${space}
`

export const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyleUpload = styledSystem(styled('div')`
  .ant-upload-picture-card-wrapper {
    width: auto;
  }
  .ant-upload.ant-upload-select-picture-card {
    margin: 0;
  }
`)
