import styled from '@emotion/styled';
import { device } from '../services/deviceSizes';

export const Section = styled.section`
  padding: 30px;
  width: 100%;
  background-color: var(--addBgColor);
  text-align: center;

  & > h3 {
    margin: 0 auto;
    width: 70vw;
    font-weight: 400;
    font-size: 25px;
    line-height: 135%;
    color: var(--mainTextColor);

    @media ${device.tablet} {
      font-weight: 400;
      font-size: 40px;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
