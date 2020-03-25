import styled from 'styled-components'
import { container } from '../../styles/mixins'
import styledSystem from '../../styles/styledSystem'

export const ListBuild = styledSystem(styled.div``)

export const Container = styled.div`
  padding-bottom: 40px;
  ${container.centerBox}
`

export const StyleImg = styledSystem(styled.div``)

export const marginRight = {
  marginRight: '10px',
}

export const appleStyle = {
  fontSize: '20px',
  color: '#bf5af2',
}

export const androidStyle = {
  fontSize: '20px',
  color: '#8eba3e',
}

export const LinkDownload = styled.a`
  color: #fa8c16;
  :hover {
    color: #fa8c16
  }
`
