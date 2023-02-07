import { createTheme } from '@mui/material/styles';

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
