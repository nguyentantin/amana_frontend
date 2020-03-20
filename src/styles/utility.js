import styled from 'styled-components'
import { system, space, color, layout } from 'styled-system'

export const Flex = styled('div')(
  system({
    flex: {
      properties: ['display'],
      defaultScale: ['flex', 'inline-flex', 'block', 'inline-block'],
    },
  })
)

export const Box = styled.div(
  space,
  color,
  layout
)
