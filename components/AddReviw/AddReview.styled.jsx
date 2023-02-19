import styled from '@emotion/styled';
import { device } from '../../services/deviceSizes';
import { Rating } from '@mui/material';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 80px;

  & > div {
    text-align: center;
    border-radius: 20px;
  }

  @media ${device.laptopM} {
    margin-bottom: 100px;
  }

  @media ${device.laptopM} {
    margin-bottom: 115px;
  }
`;

export const Form = styled.form`
  width: 100%;
  margin: 0;

  & > textarea {
    display: block;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 15px;
    resize: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: 14px;
    line-height: 14px;
    border: 0.5px solid var(--mainTextColor);
    border-radius: 10px;
    background-color: transparent;
    color: var(--mainTextColor);
    outline: none;

    &::placeholder {
      color: var(--addTextColor);
      font-family: inherit;
      font-size: 14px;
      line-height: 14px;

      @media ${device.laptopM} {
        font-size: 20px;
        line-height: 20px;
      }
    }

    @media ${device.laptopM} {
      max-width: 900px;
      margin: 0;
      padding: 35px;
    }
  }

  @media ${device.laptopM} {
    max-width: 685px;
  }

  @media ${device.laptopL} {
    max-width: 900px;
  }
`;

export const Wrap = styled.div`
  width: 350px;
  margin-top: 20px;
  margin-left: auto;

  @media ${device.laptopM} {
    width: 210px;
    margi-top: 30px;
  }

  @media ${device.laptopL} {
    width: 220px;
  }

  & > button {
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    color: var(--mainTextColor);
    border: 0.5px solid var(--mainTextColor);
    border-radius: 10px;
    background-color: transparent;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 16px;

    @media ${device.laptopM} {
      margin-top: 30px;
    }

    @media ${device.laptopL} {
      font-size: 27px;
      line-height: 27px;
    }
  }
`;

export const StyledRating = styled(Rating)`
  color: var(--mainTextColor);

  & > span {
    padding: 0 5px;

    @media ${device.laptopM} {
      padding: 0 10px;
    }
  }
`;
