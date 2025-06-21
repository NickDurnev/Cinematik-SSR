"use client";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { MouseEvent, useState } from "react";

import useSizeScreen from "@/hooks/useSizeScreen";

//#Components
import { NavLink, Show, UserBar } from "@/components";

import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const pages = [
  { name: "Home", href: "/" },
  // { name: 'Benefits', href: '/benefits' },
  { name: "Reviews", href: "/reviews" },
];

const AppBar = () => {
  const isSizeScreen = useSizeScreen();
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  return (
    <header>
      <MuiAppBar
        position="static"
        sx={{ backgroundColor: theme.palette.navColor.main }}
      >
        <Container maxWidth={false} disableGutters={true}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding:
                isSizeScreen === "phone" || isSizeScreen === "tablet"
                  ? "0 12px"
                  : " 0 120px",
              height: isSizeScreen === "phone" ? "57px" : "122px",
              borderBottom: "0.5px solid var(--color-text-main)",
            }}
          >
            <div className="flex items-center">
              {isSizeScreen === "phone" ? (
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
                  display: { xs: "none", md: "flex" },
                  fontFamily: "var(--font-muller)",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  letterSpacing: "0.2em",
                  color: "var(--color-text-main)",
                  textDecoration: "none",
                }}
              >
                CINEMATIK
              </Typography>
            </div>
            <>
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "var(--font-muller)",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "17px",
                  letterSpacing: "0.2em",
                  color: "var(--color-text-main)",
                  textDecoration: "none",
                }}
              >
                CINEMATIK
              </Typography>
            </>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Show
                when={isSizeScreen === "phone"}
                fallback={
                  <div className="flex w-auto items-center">
                    <nav>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: { md: "flex" },
                          "& a+a": {
                            marginLeft: "50px",
                          },
                        }}
                      >
                        {pages.map(({ name, href }) => (
                          <NavLink
                            name={name}
                            href={href}
                            key={name}
                            onClick={handleCloseNavMenu}
                            sx={{
                              my: 2,
                              color: "#00000000",
                              display: "block",
                            }}
                          />
                        ))}
                      </Box>
                    </nav>
                    <UserBar />
                  </div>
                }
              >
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    sx={{ color: theme.palette.mainTextColor.main }}
                  >
                    <Image src="/Menu.svg" width={24} height={24} alt="Menu" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map(({ name, href }) => (
                      <MenuItem key={name} onClick={handleCloseNavMenu}>
                        <NavLink name={name} href={href} />
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Show>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </header>
  );
};

export default AppBar;
