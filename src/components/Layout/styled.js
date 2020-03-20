import styled from 'styled-components'
import { Layout } from 'antd'

const {Header, Content} = Layout

export const HeaderWrapper = styled(Header)`
  background: #fff;
  padding: 0 30px;
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-menu {
    font-size: 18px;
    border: 0;
  }
  &.active {
    background: transparent;
    transition-duration: 0.4s;
    .ant-menu {
      background: transparent;
      border-bottom: 0;
      .ant-menu-item > a {
        color: #fff;
      }
    }
    &.normal {
      background: #fff;
      .ant-menu {
        .ant-menu-item {
        top: 0;
           a {
            color: #000;
          }
        } 
      }
    }
    @media (max-width: 768px) {
      background: #fff;
    }
  }
`

export const ContentPage = styled(Content)`
  padding: 0;
  min-height: calc(100vh - 69px);
  padding-top: 66px;
  &.active {
    padding-top: 0;
  }
`

export const MasterLayoutWrapper = styled.div`
  ul,
  ol {
    list-style: none;
  }

  input::placeholder {
    color: #ccc;
    font-weight: 200;
  }
`

export const LogoWrapper = styled.span`
  img {
    width: 150px;
  }
`
