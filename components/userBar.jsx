import { useEffect, useState } from 'react';
import { Button, Avatar } from '@mui/material';
import stringAvatar from '../services/avatarFormatter';
import { Container, CustomButton } from '../styles/UserBar.styled';

const UserBar = ({ authData }) => {
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
      {user ? (
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
            <CustomButton
              sx={{ ml: '20px' }}
              variant="contained"
              color="accentColor"
              href="https://cinamatikapplication.vercel.app/"
            >
              Go to App
            </CustomButton>
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

export default UserBar;
