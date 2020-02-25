import styled, { css } from 'styled-components'
import ReactModal from 'react-modal'
import Button from 'components/FormUI/Button'

const overrideStyles = {
  '.modal-manager-account': `
    width: 500px;
  `,
  '.modal-advanced-search': `
    min-width: 900px;
  `,
  '.movie-modal-advanced-search': `
    min-width: 600px;
  `,
  '.modal-reply-contact': `
    min-width: 500px;
  `,
  '.movie-modal-movie-advanced-search': `
    min-width: 720px;
  `,
}

const overrideStylesTransformed = Object.keys(overrideStyles)
  .map(className => `&${className}{${overrideStyles[className]}}`)
  .join('\n')

const placeStyles = {
  top: () => `
    top: 5% !important;
    transform: translate(-50%, 0) !important;
  `,
}

export const Modal = styled(ReactModal)`
  &.ReactModal {
    &__Content {
      &--after-open {
        ${props => props.placement && props.placement.split('-').map(place => placeStyles[place](props)).join('\n')}
        ${overrideStylesTransformed}
      }
    }
  }
`

export const Title = styled.h2`
  font-weight: 400;
  margin-top: -10px;
  text-align: ${props => props.align || 'center'};
`

export const Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${props => (props.secondary ? '15px' : '25px')};

  ${Button} {
    margin: 0 10px;
  }
`

export const FormLabel = styled.div`
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
  margin: 10px 20px 10px 0;
  width: 20%;
  ${props => props.required && css`
    &:after {
      content: '*';
      color: #d90909;
    }
  `}
`

export const FormRowContent = styled.div`
  flex-grow: 1;
  flex-basis: 1px;
  width: 1px;
`

export const FormNote = styled.small`
  color: #808080;
  display: block;
  font-size: 13px;
  margin-top: 8px;
`

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 15px;

  ${FormLabel} {
    text-align: ${props => props.labelAlign || 'left'};
  }
`

export const DangerAction = styled(Button).attrs({
  transparent: true,
  small: true,
  type: 'button',
})`
  align-items: center;
  display: inline-flex;
  color: #d90909;
  font-size: 13px;
`

export const TagsWrapper = styled.div`
  border-bottom: 1px solid #dee2e6;
  padding: 10px 30px 10px 0;
`

export const SelectWrapper = styled.div`
  margin-bottom: 15px;
  margin-top: 15px;
`

export const SelectDesc = styled.p`
  color: #808080;
  font-size: 14px;
`
