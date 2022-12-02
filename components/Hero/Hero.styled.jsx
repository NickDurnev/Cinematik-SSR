import styled from '@emotion/styled';
import { device } from '../../services/deviceSizes';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 10px;
  width: 100%;
  background-color: var(--addBgColor);

  @media ${device.tablet} {
    padding: 30px 60px;
  }
`;

export const Title = styled.h1`
  width: 45vw;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 40px;
  line-height: 50px;
  position: relative;
  display: inline-block;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: url('/City Lights.jpg');
  background-size: 40vw 45vw;

  @media ${device.tablet} {
    width: 40vw;
    font-size: 55px;
    line-height: 70px;
  }

  @media ${'(min-width: 1000px)'} {
    width: 40vw;
    font-size: 100px;
    line-height: 130px;
  }
`;
