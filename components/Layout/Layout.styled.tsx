import styled from '@emotion/styled';
import { device } from '../../services/deviceSizes';

export const Container = styled.div`
  background: linear-gradient(
    180deg,
    var(--mainBgColor) 0%,
    var(--addBgColor) 100%
  );
  min-height: 100vh;
`;

export const Wrap = styled.div`
  padding: 0 15px;

  @media ${device.laptopM} {
    padding: 0 110px;
  }

  @media ${device.laptopL} {
    padding: 0 120px;
  }
`;
