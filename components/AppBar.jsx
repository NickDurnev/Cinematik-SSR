import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import NavLink from './Link';
import UserBar from './userBar';
import { Header, LogoWrap, NavWrap } from '../styles/AppBar.styled';

const pages = [
  { name: 'Home', href: '/' },
  // { name: 'Benefits', href: '/benefits' },
  { name: 'Reviews', href: '/reviews' },
];

const ResponsiveAppBar = ({ authData }) => {
  const [isSizeScreen, setIsSizeScreen] = useState(null);

  useEffect(() => {
    // You now have access to `window`
    if (window.matchMedia('(min-width: 768px)').matches) {
      setIsSizeScreen('tablet');
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Header>
      <AppBar position="static" color="navColor">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 80,
            }}
          >
            <LogoWrap>
              <PlayCircleFilledWhiteIcon
                color="accentColor"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                }}
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

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="mainTextColor"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(({ name, href }) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <NavLink name={name} href={href} />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {isSizeScreen && (
              <>
                <PlayCircleFilledWhiteIcon
                  color="accentColor"
                  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'roboto',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  CINEMATIK
                </Typography>
              </>
            )}
            <NavWrap>
              <nav>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: 'none', md: 'flex' },
                  }}
                >
                  {pages.map(({ name, href }) => (
                    <NavLink
                      name={name}
                      href={href}
                      key={name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    />
                  ))}
                </Box>
              </nav>
              <UserBar authData={authData} />
            </NavWrap>
          </Toolbar>
        </Container>
      </AppBar>
    </Header>
  );
};
export default ResponsiveAppBar;
