import styled from '@emotion/styled';
import { device } from '../src/services/deviceSizes';

export const Section = styled.section`
  width: 100%;
  padding: 55px 0;
  & > h2 {
    font-family: 'Technovier';
    text-transform: uppercase;
    margin-bottom: 60px;
    font-size: 35px;
    line-height: 41px;
    letter-spacing: 0.05em;
    color: var(--mainTextColor);

    @media ${device.laptopM} {
      margin-bottom: 0;
      font-size: 50px;
      line-height: 59px;
    }
  }

  @media ${device.laptopM} {
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 60px 0;
  }

  @media ${device.laptopL} {
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 80px 0;
  }
`;
