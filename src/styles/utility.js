import styled from 'styled-components'
import { system } from 'styled-system'

export const Flex = styled('div')(
  system({
    flex: {
      properties: ['display'],
      defaultScale: ['flex', 'inline-flex', 'block', 'inline-block'],
    },
  })
)
