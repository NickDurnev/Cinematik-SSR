import styled from '@emotion/styled';

export const StyledLink = styled.a`
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: var(--mainTextColor);
  & + & {
    margin-left: 50px;
  }
`;
