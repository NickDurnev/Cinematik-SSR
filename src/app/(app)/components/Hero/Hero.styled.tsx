"use client";
import styled from "@emotion/styled";

import { device } from "@/services/deviceSizes";

export const Container = styled.section`
  padding-top: 55px;

  @media ${device.laptopM} {
    padding-top: 60px;
  }

  @media ${device.laptopL} {
    padding-top: 70px;
  }
`;

export const Title = styled.h1`
  width: 100%;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-family: 'Technovier';
  font-size: 35px;
  line-height: 41px;
  letter-spacing: 0.05em;
  color: #fff;

  @media ${device.tablet} {
    font-size: 50px;
    line-height: 70px;
  }

  @media ${device.laptopM} {
    width: calc(100vw - 220);
    font-size: 60px;
    line-height: 100px;
  }

  @media ${device.laptopL} {
    width: calc(100vw - 240);
    font-size: 80px;
    line-height: 120px;
  }
`;

export const Wrap = styled.section`
  @media ${device.laptopM} {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media ${device.laptopL} {
    width: 1550px;
  }
`;

export const Background = styled.div`
  position: relative;
  height: 420px;

  @media ${device.laptopL} {
    height: 650px;
  }
`;

export const Splash = styled.div`
  position: absolute;
  top: 30px;
  left: -130px;
  width: 302px;
  height: 302px;

  @media ${device.tablet} {
    top: 50px;
    left: -50px;
    width: 445px;
    height: 445px;
  }

  @media ${device.laptopL} {
    top: 40px;
    left: -60px;
    width: 635px;
    height: 635px;
  }
`;

export const Device = styled.div`
  position: absolute;
  top: 0;
  left: 110px;
  width: 190px;
  height: 365px;

  @media ${device.tablet} {
    left: 100px;
    width: 625px;
    height: 465px;
  }

  @media ${device.laptopM} {
    left: 190px;
  }

  @media ${device.laptopL} {
    left: 170px;
    width: 900px;
    height: 580px;
  }
`;
