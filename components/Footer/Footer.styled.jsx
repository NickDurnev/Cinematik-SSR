import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--mainBgColor);
`;

export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  & > p {
    margin-top: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: var(--mainTextColor);

    text-align: center;
  }
`;

export const LogoWrap = styled.div`
  width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  & > svg {
    width: 40px;
    height: 40px;
  }
  & > a {
    margin: 0;
  }
`;
