import styled from 'styled-components'
import { space } from 'styled-system'
import { Card, Avatar } from 'antd'

import styledSystem from '../../styles/styledSystem'

export const AvatarBox = styledSystem(styled.div`
  position: relative;
  display: block;
  margin: auto;
  width: 100px;
  height: 100px;
  @keyframes popDown{
    100%{
      transform: translateY(0);
      opacity: 1;
    }
  }
  .avatar_bg {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: rgba(255,169, 64, 0.2);
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 500ms;
  }
  .ant-btn {
    border-radius: 2px;
    text-transform: uppercase;
    margin: auto !important;
    animation: popDown 300ms 1 forwards;
    transform: translateY(-10px);
    display: none;
    opacity: 0;
    transition: background 200ms, color 200ms;
    &:hover {
      background: #222;
    }
  }
  &:hover {
    .avatar_bg {
      opacity: 1;
    }
    .ant-btn {
      display: block;
      color: #ffa940;
      border-color: #ffa940;
    }
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
