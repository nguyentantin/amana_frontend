import styled from 'styled-components'
import PropTypes from 'prop-types'

export const ScrollContainer = styled.div`
  height: ${props => props.height};
  overflow: auto;
`
ScrollContainer.propTypes = {
  height: PropTypes.string.isRequired
}

