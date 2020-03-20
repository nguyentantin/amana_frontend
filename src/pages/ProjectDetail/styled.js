import styled from 'styled-components'
import { container } from '../../styles/mixins'

export const ListBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .content-left {
    padding: 0 8px;
  }
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

export const hrStyle = {
  border: '0',
  marginBottom: '20px',
  height: '1px',
  background: '#333',
  backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)',
}

export const appleStyle = {
  fontSize: '20px',
  color: '#bf5af2',
}

export const androidStyle = {
  fontSize: '20px',
  color: '#8eba3e',
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
