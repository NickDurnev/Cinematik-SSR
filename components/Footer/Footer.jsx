import Image from 'next/image';
import useSizeScreen from '../../hooks/useSizeScreen';
import { StyledFooter, Container, LogoWrap } from './Footer.styled';

const Footer = () => {
  const isSizeScreen = useSizeScreen();

  return (
    <StyledFooter>
      <Container>
        <LogoWrap>
          {isSizeScreen === 'phone' ? (
            <Image src="/Logo.svg" width={42} height={48} alt="Logo" />
          ) : (
            <Image src="/Logo.svg" width={58} height={65} alt="Logo" />
          )}
          <p>CINEMATIK</p>
        </LogoWrap>
        <div>
          <p>Crafted by Dumb Gooses Labs</p>
          <p>2023</p>
        </div>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
