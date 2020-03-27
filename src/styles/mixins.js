import { css } from 'styled-components';

export const container = {
  centerBox: css`
    width: 1170px;
    margin: 40px auto 15px;
    @media (max-width: 992px) {
      width: 970px;
    }
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px;
      margin: 0;
    }
  `
}
