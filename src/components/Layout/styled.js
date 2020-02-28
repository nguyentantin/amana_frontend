import styled from 'styled-components'

export const LayoutContainer = styled.div`
  background: #fff;
  flex-grow: 1;
  overflow: hidden;
  margin-left: 260px;
`

export const MainContainer = styled.div`
  padding: 30px;
  margin-top: 60px;
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

  /* NOTE: Fix ie flex container min-height not work */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    display: flex;
    flex-direction: column;
  }
`

export const DashboardLayoutWrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`

export const LogoWrapper = styled.span`
  img {
    width: 150px;
  }
`
