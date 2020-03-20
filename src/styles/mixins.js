import { css } from 'styled-components';

export const container = {
  centerBox: css`
    padding-top: 40px;
    width: 1170px;
    margin: 0 auto !important;
    @media (max-width: 992px) {
      width: 970px;
    }
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px;
    }
  `
}
