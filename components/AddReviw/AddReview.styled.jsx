import styled from '@emotion/styled';
import { device } from '../../services/deviceSizes';

export const Container = styled.div`
  width: 100vw;
  padding: 10px 10vw;
  background-color: var(--addBgColor);

  & > div {
    background-color: var(--thirdBgColor);
    text-align: center;
    border-radius: 20px;
  }

  @media ${device.tablet} {
    padding: 30px 20vw;
  }

  @media ${device.laptop} {
    padding: 30px 30vw;
  }
`;

export const Form = styled.form`
  padding: 20px 5vw;

  & > textarea {
    width: 100%;
    margin-bottom: 10px;
    display: block;
    resize: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: 16px;
    background-color: #bebeff7e;
    color: var(--mainTextColor);
    outline: none;

    &::placeholder {
      color: #ffffff96;
      font-family: inherit;
      font-size: inherit;
    }
  }

  & > button {
    display: block;
    padding: 5px 10px;
    margin: 0 auto;
    color: var(--mainTextColor);
    background-color: var(--accentColor);
    font-size: 16px;
  }
`;
