import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  .ant-table {
  display: block;

  @media screen and (max-width: 600px) {
    &-thead {
      display: none;
    }

    &-thead>tr,
    &-tbody>tr {

      th,
      td {
        &:first-of-type {
          padding-top: 1rem;
        }

        &:last-of-type {
          padding-bottom: 1rem;
        }
      }

      >th,
      >td {
        display: block;
        width: auto !important;
        border: none;
        padding: 0 1rem;
        font-size: 1.1rem;

        &:last-child {
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
`

export default GlobalStyle
