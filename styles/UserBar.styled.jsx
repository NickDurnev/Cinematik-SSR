import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { device } from '../services/deviceSizes';

export const Container = styled.div`
  height: 100%;
  margin-left: 20px;
  color: var(--mainTextColor);
  text-align: center;

  & > div {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${device.tablet} {
      width: 290px;
    }
  }

  & h3 {
    margin-bottom: 5px;
  }
`;

export const CustomButton = styled(Button)`
  font-size: 10px;
  padding: 5px;

  @media ${device.tablet} {
    font-size: 16px;
  }
`;
