import styled from "@emotion/styled";
import { ITheme, IMovie } from "services/interfaces";
import Wrap from "components/Button/Button.styled";
import { device } from "helpers/deviceSizes";

export const Container = styled.div<{ theme?: ITheme }>`
  width: 100%;
  margin-top: 60px;
  color: ${({ theme }) => theme.textColor};

  @media ${device.tablet} {
    width: 80vw;
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  @media ${device.laptopM} {
    width: 1200px;
  }

  @media ${device.laptopL} {
    width: 1370px;
  }
`;

export const ImageWrap = styled.div<{
  theme?: ITheme;
  poster_path: IMovie["poster_path"];
}>`
  width: 310px;
  height: 465px;
  margin: 0 auto;
  background-color: ${({ poster_path }) => !poster_path && "#666666"};
  color: ${({ theme }) => theme.linkColor};

  @media ${device.tablet} {
    width: 250px;
    height: 400px;
    margin: 0;
  }

  @media ${device.laptopM} {
    width: 400px;
    height: 600px;
  }

  & > img {
    width: 100%;
    height: 100%;
  }

  & svg {
    width: 150px;
    height: auto;
    stroke: currentColor;
  }
`;

export const InfoWrap = styled.div`
  width: 100%;
  margin-top: 20px;

  & > h2 {
    margin-bottom: 30px;
    font-family: 'Technovier';
    font-size: 30px;
    line-height: 37px;

    @media ${device.laptop} {
      font-size: 40px;
      line-height: 47px;
    }
  }

  & > h3 {
    margin-bottom: 20px;
  }

  & h3 {
    font-size: 20px;
  }

  & > p {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 50px;
  }

  @media ${device.tablet} {
    width: 380px;
  }

  @media ${device.laptop} {
    width: 640px;
  }

  @media ${device.laptopM} {
    width: 700px;
  }

  @media ${device.laptopL} {
    width: 850px;
  }
`;

export const MainInfo = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-left: 5px;
  font-size: 18px;
  line-height: 18px;

  & > li:first-of-type {
    text-align: left;
    margin-right: 60px;

    @media ${device.laptop} {
      margin-right: 120px;
    }
  }

  & > li:last-child {
    text-align: right;
  }

  & > li > p + p {
    margin-top: 30px;
  }

  @media ${device.tablet} {
    margin-left: 0;
    width: 350px;
  }

  @media ${device.laptop} {
    width: 500px;
    font-size: 20px;
    line-height: 20px;
  }

  @media ${device.laptopM} {
    width: 600px;
  }

  @media ${device.laptopL} {
    padding-left: 10px;
  }
`;

export const MovieGenresList = styled.ul<{ theme?: ITheme }>`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.linkColor};

  @media ${device.laptop} {
    justify-content: start;
  }

  & > li {
    padding: 15px 30px;
    font-family: sans-serif;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    text-decoration: none;
    display: inline-block;
    background-image: linear-gradient(
      to right,
      ${props => props.theme.linkColor},
      ${props => props.theme.linkColor} 50%,
      #000 50%
    );
    background-size: 200% 100%;
    background-position: -100%;
    position: relative;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${props => props.theme.linkColor};
    transition: all ${props => props.theme.hoverTransition} ${props => props.theme.hoverTimeFunction};
    &:before {
      content: '';
      background: ${props => props.theme.linkColor};
      display: block;
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 3px;
      transition: all 0.3s ease-in-out;
    }
    &:hover {
      background-position: 0;
    }
    &:hover::before {
      width: 100%;
      margin: 0;
    }
  }
`;

export const ButtonWrap = styled.div`
  margin-left: 0;
  margin-top: 50px;

  @media ${device.laptop} {
    width: 550px;
    margin-top: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Button = styled(Wrap)`
  width: 220px;
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 10px 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

export const IconButton = styled(Wrap)<{ theme?: ITheme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 290px;
  padding: 10px 30px;
  margin: 0 auto;
  cursor:pointer;
  color: ${({ theme, disabled }) => disabled && theme.addBgElementColor};
  border: 1px solid
    ${({ theme, disabled }) => disabled && theme.addBgElementColor};
  & > svg {
    stroke: currentColor;
    width: 20px;
    height: 20px;
  }
`;
