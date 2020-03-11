import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  .container {
    width: 1170px;
    margin: 0 auto !important;
  }

  .d-flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 992px) {
    .container {
      width: 970px;
    }
  }
`

export default GlobalStyle
