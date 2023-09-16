import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module '@mui/material/styles/createPalette' {
  export interface PaletteOptions {
    navColor: { main: string };
    mainTextColor: { main: string };
    accentColor: { main: string };
  }
  export interface Palette {
    navColor: { main: string };
    mainTextColor: { main: string };
    accentColor: { main: string };
  }
}

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#3e3d6b',
          color: '#fff',
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '18px',
      textTransform: 'none',
    },
  },
  palette: {
    navColor: {
      main: 'transparent',
    },
    mainTextColor: {
      main: '#fff',
    },
    accentColor: {
      main: '#fff',
    },
  },
});

export default theme;
