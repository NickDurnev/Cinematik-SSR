import styled from '@emotion/styled';
import Image from 'next/image';

export const Section = styled.section`
  padding: 30px;
  width: 100%;
  background-color: var(--addBgColor);
  text-align: center;

  & > h3 {
    margin: 0 auto;
    width: 630px;
    font-weight: 400;
    font-size: 40px;
    line-height: 135%;
    color: var(--mainTextColor);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
