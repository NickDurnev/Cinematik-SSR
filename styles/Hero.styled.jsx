import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 130px;
  width: 100%;
  background-color: var(--addBgColor);
`;

export const Title = styled.h1`
  width: 450px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 100px;
  line-height: 130px;
  position: relative;
  display: inline-block;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: url('/City Lights.jpg');
  background-size: 450px 520px;
`;
