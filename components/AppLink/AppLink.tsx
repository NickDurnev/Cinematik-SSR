import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { IUser } from '../../services/interfaces';
import {
  Container,
  ButtonContainer,
  LoginButton,
  CustomButton,
} from './AppLink.styled';

const AppLink = ({ currentUser }: { currentUser: IUser }) => {
  const theme = useTheme();

  return (
    <Container>
      {currentUser ? (
        <div>
          <h3 style={{ color: '#fff' }}>
            Welcome <br />
            {currentUser.name}
          </h3>
          <ButtonContainer>
            <CustomButton
              variant="text"
              sx={{ color: theme.palette.accentColor.main }}
              href="/api/auth/logout"
            >
              Logout
            </CustomButton>
            <Link
              href={`https://cinematikapplication.vercel.app/${currentUser._id}`}
              passHref
            >
              <CustomButton
                sx={{ ml: '20px', color: theme.palette.accentColor.main }}
                variant="text"
              >
                Go to App
              </CustomButton>
            </Link>
          </ButtonContainer>
        </div>
      ) : (
        <LoginButton variant="text" sx={{ color: theme.palette.accentColor.main }}
          href="/api/auth/login">
          Login
        </LoginButton>
      )}
    </Container>
  );
};

export default AppLink;
