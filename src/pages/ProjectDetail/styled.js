import styled from 'styled-components'
import { container } from '../../styles/mixins'

export const ListBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Container = styled.div`
  padding-bottom: 40px;
  ${container.centerBox}
`

export const divImg = {
  paddingRight: '20px',
  paddingBottom: '20px'
}

export const marginRight = {
  marginRight: '10px',
}

export const SmallTitle =  styled.small`
    font-size: 69%;
    color: rgba(0, 0, 0, 0.45);
  `

export const LinkDownload = styled.a`
  color: white;
  :hover {
    color: white
  }
`
