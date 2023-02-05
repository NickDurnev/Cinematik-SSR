import styled from '@emotion/styled';
import { device } from '../../services/deviceSizes';

export const StyledFooter = styled.footer`
  width: 100%;
  padding-bottom: 54px;

  @media ${device.tablet} {
    padding-bottom: 65px;
  }

  @media ${device.laptopL} {
    padding-bottom: 85px;
  }
`;

export const Container = styled.section`
  & > div {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    & > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0.1em;
      color: var(--mainTextColor);

      @media ${device.tablet} {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }
`;

export const LogoWrap = styled.div`
  margin: 0;
  width: 170px;
  display: flex;
  align-items: center;

  & > p {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.2em;
    color: var(--mainTextColor);
  }
`;
