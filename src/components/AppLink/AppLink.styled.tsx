"use client";
import { device } from "@/services/deviceSizes";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Container = styled.div`
  width: 350px;
  margin: 0 auto;
  background-color: transparent;

  @media ${device.tablet} {
    margin: 100px auto;
    margin-bottom: 0;
  }

  @media ${device.laptopM} {
    margin: 0;
    margin-bottom: 20px;
  }

  @media ${device.laptopL} {
    margin-bottom: 120px;
  }

  & h3 {
    margin-bottom: 30px;
    font-size: 35px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0.05em;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LoginButton = styled(Button)`
  padding: 20px 130px;
  font-family: 'Muller';
  text-transform: uppercase;
  font-size: 27px;
  line-height: 27px;
  border: 1px solid #fff;
  border-radius: 10px;
`;

export const CustomButton = styled(Button)`
  font-family: 'Muller';
  text-transform: uppercase;
  font-size: 20px;
  line-height: 20px;
  padding: 25px 30px;
  border: 1px solid #fff;
  border-radius: 10px;
`;
