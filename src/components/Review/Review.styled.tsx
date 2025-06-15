import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { device } from "../../services/deviceSizes";

export const Wrap = styled(motion.li)`
  width: 100%;
  padding-bottom: 35px;
  color: var(--mainTextColor);
  background-color: #00000000;
  border-bottom: 0.5px solid var(--addTextColor);

  & img {
    border-radius: 50%;
  }
`;

export const Header = styled.div`
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 210px;

  @media ${device.laptopM} {
    margin-bottom: 50px;
  }
`;

export const StyledRating = styled(Rating)`
  color: var(--mainTextColor);
  display: flex;
  justify-content: space-between;
  width: 140px;
`;

export const InfoWrap = styled.div`
  width: 100%;
  text-align: start;

  & p {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: var(--mainTextColor);
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Text = styled.p`
  margin-bottom: 35px;

  @media ${device.laptopM} {
    width: 540px;
    margin-bottom: 50px;
  }

  @media ${device.laptopL} {
    width: 690px;
    margin-bottom: 65px;
  }
`;
