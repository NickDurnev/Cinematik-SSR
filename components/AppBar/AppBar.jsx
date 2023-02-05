import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Image from 'next/image';
//# MUI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import useSizeScreen from '../../hooks/useSizeScreen';
import NavLink from '../Link';
import UserBar from '../UserBar';
import { Header, LogoWrap, NavWrap } from './AppBar.styled';

const pages = [
  { name: 'Home', href: '/' },
  // { name: 'Benefits', href: '/benefits' },
  { name: 'Reviews', href: '/reviews' },
];

const ResponsiveAppBar = ({ authData = null, currentUser }) => {
  const isSizeScreen = useSizeScreen();

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
        <Container maxWidth="false" disableGutters={true}>
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding:
                isSizeScreen === 'phone' || isSizeScreen === 'tablet'
                  ? '0 12px'
                  : ' 0 120px',
              height: isSizeScreen === 'phone' ? '57px' : '122px',
              borderBottom: '0.5px solid #fff',
            }}
          >
            <LogoWrap>
              {isSizeScreen === 'phone' ? (
                <Image src="/Logo.svg" width={42} height={48} alt="Logo" />
              ) : (
                <Image src="/Logo.svg" width={58} height={65} alt="Logo" />
              )}
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Muller',
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.2em',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                CINEMATIK
              </Typography>
            </LogoWrap>
            <>
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'Muller',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '17px',
                  letterSpacing: '0.2em',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                CINEMATIK
              </Typography>
            </>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {isSizeScreen !== 'phone' && (
                <NavWrap>
                  <nav>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: { md: 'flex' },
                      }}
                    >
                      {pages.map(({ name, href }) => (
                        <NavLink
                          name={name}
                          href={href}
                          key={name}
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'transparent', display: 'block' }}
                        />
                      ))}
                    </Box>
                  </nav>
                  <UserBar authData={authData} currentUser={currentUser} />
                </NavWrap>
              )}
              {isSizeScreen === 'phone' && (
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="mainTextColor"
                  >
                    <Image src="/Menu.svg" width={24} height={24} alt="Menu" />
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
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Header>
  );
};

AppBar.propTypes = {
  authData: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
};

export default ResponsiveAppBar;
