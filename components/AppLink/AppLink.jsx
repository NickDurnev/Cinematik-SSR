import { PropTypes } from 'prop-types';
import Link from 'next/link';
import {
  Container,
  ButtonContainer,
  LoginButton,
  CustomButton,
} from './AppLink.styled';

const AppLink = ({ currentUser }) => {
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
              color="accentColor"
              href="/api/auth/logout"
            >
              Logout
            </CustomButton>
            <Link
              href={`https://cinematikapplication.vercel.app/${currentUser._id}`}
              passHref
            >
              <CustomButton
                sx={{ ml: '20px' }}
                variant="text"
                color="accentColor"
              >
                Go to App
              </CustomButton>
            </Link>
          </ButtonContainer>
        </div>
      ) : (
        <LoginButton variant="text" color="accentColor" href="/api/auth/login">
          Login
        </LoginButton>
      )}
    </Container>
  );
};

AppLink.propTypes = {
  currentUser: PropTypes.oneOfType([
    PropTypes.shape({ _id: PropTypes.string.isRequired }),
    PropTypes.oneOf([null]).isRequired,
  ]),
};

export default AppLink;
