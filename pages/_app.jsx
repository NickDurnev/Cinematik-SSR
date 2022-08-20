import Layout from '../components/Layouts';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    navColor: {
      main: 'rgba(12, 13, 46, 0.9)',
    },
    mainTextColor: {
      main: '#fff',
    },
    accentColor: {
      main: '#1190cb',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
