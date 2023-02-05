import { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/Layout/Layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: ${theme.palette.mainTextColor.main};
    background-color: ${theme.palette.navColor.main};
    & > button {
      color: ${theme.palette.mainTextColor.main};
    }
  }
`;

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Layout
          setCurrentUser={user => setCurrentUser(user)}
          currentUser={currentUser}
        >
          <Component {...pageProps} currentUser={currentUser} />
        </Layout>
        <StyledToastContainer
          autoClose={3000}
          position={'top-center'}
          limit={1}
        />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
