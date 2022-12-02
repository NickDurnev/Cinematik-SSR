import { Typography } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { StyledFooter, Container, LogoWrap } from './Footer.styled';

const Footer = () => (
  <StyledFooter>
    <Container>
      <LogoWrap>
        <PlayCircleFilledWhiteIcon
          color="accentColor"
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'roboto',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          CINEMATIK
        </Typography>
      </LogoWrap>
      <p>Crafted by Nikita Durnev in 2022</p>
    </Container>
  </StyledFooter>
);

export default Footer;
