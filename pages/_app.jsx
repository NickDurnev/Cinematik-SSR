import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import theme from '../services/theme';

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: var(--mainTextColor);
    background-color: var(--mainBgColor);
    & > button {
      color: var(--mainTextColor);
    }
  }
`;

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLeftReview, setIsLeftReview] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setIsLeftReview(currentUser.leftReview);
    }
  }, [currentUser]);

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Layout
          setCurrentUser={user => setCurrentUser(user)}
          currentUser={currentUser}
        >
          <Component
            {...pageProps}
            currentUser={currentUser}
            isLeftReview={isLeftReview}
            setIsLeftReview={setIsLeftReview}
          />
          <StyledToastContainer
            autoClose={3000}
            position={'top-center'}
            limit={1}
          />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
