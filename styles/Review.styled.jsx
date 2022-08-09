import styled from '@emotion/styled';

export const Wrap = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: var(--mainTextColor);
  background-color: var(--thirdBgColor);
  border-radius: 10px;

  & img {
    border-radius: 50%;
  }

  & + & {
    margin-top: 20px;
  }
`;

export const Name = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

export const InfoWrap = styled.div`
  width: 80%;
  text-align: center;

  & p + p {
    margin-top: 10px;
  }
`;

export default Wrap;
