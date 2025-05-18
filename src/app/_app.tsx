import { useState, useEffect, ElementType } from 'react';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
//#Services
import { IUser } from '../services/interfaces';
import theme from '../services/theme';
//#Components
import Layout from '../components/Layout/Layout';
//#Styles
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

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

interface IProps {
  Component: ElementType;
  pageProps: object;
}

const MyApp = ({ Component, pageProps }: IProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLeftReview, setIsLeftReview] = useState<boolean | null>(null);

  useEffect(() => {
    if (currentUser?.leftReview) {
      setIsLeftReview(currentUser?.leftReview);
    }
  }, [currentUser]);

  return (
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
  );
};

export default MyApp;
