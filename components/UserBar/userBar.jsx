import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Avatar } from '@mui/material';
import stringAvatar from '../../services/avatarFormatter';
import { Container} from './UserBar.styled';

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
              sx={{
                width: 60,
                height: 60,
                fontSize: 25,
                lineHeight: '25px',
                letterSpacing: '0.05em',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
              }}
            />
          )}
        </div>
      ) : (
        <Button variant="text" color="accentColor" href="/api/auth/login">
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
