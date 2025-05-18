import styled from '@emotion/styled';
import { device } from '../../services/deviceSizes';

export const Section = styled.section`
  width: 100%;
  padding: 100px 0;
  text-align: center;

  @media ${device.tablet} {
    text-align: start;
  }

  @media ${device.laptopM} {
    width: 1000px;
  }

  @media ${device.laptopL} {
    width: 1150px;
  }

  & > h3 {
    margin-bottom: 50px;
    font-size: 16px;
    line-height: 16px;
    color: var(--mainTextColor);

    @media ${device.tablet} {
      margin-bottom: 65px;
      font-size: 20px;
      line-height: 20px;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  & > div {
    width: 50%;
    margin-bottom: 40px;

    @media ${device.tablet} {
      margin-right: 30px;
      margin-bottom: 0;
    }

    @media ${device.laptopM} {
      margin-right: 40px;
    }
  }

  & > div:last-of-type {
    margin-bottom: 0;

    @media ${device.tablet} {
      height: auto;
      margin-right: 75px;
    }

    @media ${device.laptopM} {
      margin-right: 0;
    }
  }
`;
