import styled from 'styled-components'
import { space } from 'styled-system'
import { Card, Avatar } from 'antd'
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

export const AvatarSelect = styled(Avatar)`
  :hover {
     cursor: pointer;
     border: 2px solid #fa8c16;
     -webkit-box-shadow: 0px 6px 39px -9px rgba(219,175,109,1);
     -moz-box-shadow: 0px 6px 39px -9px rgba(219,175,109,1);
     box-shadow: 0px 6px 39px -9px rgba(219,175,109,1);
  }
`
