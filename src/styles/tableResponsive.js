import styled from 'styled-components';
import { Table } from 'antd'

const TableStyle = styled(Table)`
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
          padding: 6px 1rem;

          &:last-child {
            border-bottom: 1px solid #eee;
          }
        }
      }
    }
  }
`

export default TableStyle