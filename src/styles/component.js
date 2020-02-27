import styled from 'styled-components'
import { compose, typography, space, color, variant } from 'styled-system'

export const Text = styled('div')(
  compose(
    typography,
    space,
    color
  )
)

export const Card = styled.div`
  ${variant({
  variants: {
    normal: {
      p: 2,
      boxShadow: 'default',
      borderRadius: 2,
    },
    large: {
      p: 3,
      boxShadow: 'large',
      borderRadius: 4,
    },
  }
})}
`
Card.defaultProps = {
  variant: 'normal',
}
