import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Avatar } from '@mui/material';
import stringAvatar from '../../services/avatarFormatter';
import { Container, CustomButton } from './UserBar.styled';

const UserBar = ({ authData, currentUser }) => {
  const [isSizeScreen, setIsSizeScreen] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setIsSizeScreen('tablet');
    }
  }, []);

  const { user, error, isLodaing } = authData;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      {isLodaing && <div>Loading...</div>}
      {currentUser ? (
        <div>
          {isSizeScreen && (
            <Avatar
              {...stringAvatar(`${user.name}`)}
              sx={{ width: 60, height: 60, fontSize: 25 }}
            />
          )}
          <div>
            <h3>Welcome {user.name}</h3>
            <CustomButton
              variant="contained"
              color="accentColor"
              href="/api/auth/logout"
            >
              Logout
            </CustomButton>
            <Link
              href={`https://cinematikapplication.vercel.app/welcome/${currentUser._id}`}
              passHref
            >
              <CustomButton
                sx={{ ml: '20px' }}
                variant="contained"
                color="accentColor"
              >
                Go to App
              </CustomButton>
            </Link>
          </div>
        </div>
      ) : (
        <Button variant="contained" color="accentColor" href="/api/auth/login">
          Login
        </Button>
      )}
    </Container>
  );
};

UserBar.propTypes = {
  currentUser: PropTypes.oneOfType([
    PropTypes.shape({ _id: PropTypes.string.isRequired }),
    PropTypes.oneOf([null]).isRequired,
  ]),
};

export default UserBar;
