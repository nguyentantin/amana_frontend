import styled from 'styled-components'
import { space } from 'styled-system'
import { Card, Avatar } from 'antd'

import styledSystem from '../../styles/styledSystem'

export const AvatarBox = styledSystem(styled.div`
  position: relative;
  .ant-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    margin: 0 !important;
    opacity: 0;
    transition: all .2s ease-in-out;
  }
  &:hover .ant-btn {
    opacity: 1;
    transition: all .2s ease-in-out;
    color: #ffa940;
    border-color: #ffa940;
  }
`)

export const StyleCard = styled(Card)`
  padding: 26px !important;
  border-radius: 10px !important;
  .ant-card-body {
    padding: 0;
  }
`

export const StyleLink = styled.div`
  ${space}
  text-align: center;
  .ant-btn {
    width: 300px;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
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
