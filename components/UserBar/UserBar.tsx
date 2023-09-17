import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
//#Services
import { IUser, IAuthData } from '../../services/interfaces';
//#Components
import { Button } from '@mui/material';
import UserAvatar from '../Avatar/UserAvatar';
//#Styles
import { Container } from './UserBar.styled';

interface IProps {
  authData: IAuthData | null;
  currentUser: IUser | null;
}

const UserBar = ({ authData, currentUser }: IProps) => {
  const [isSizeScreen, setIsSizeScreen] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setIsSizeScreen('tablet');
    }
  }, []);

  const theme = useTheme();

  if (!authData) return null;
  const { user, error, isLoading } = authData;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {currentUser ? (
        <div>{isSizeScreen && <UserAvatar name={user?.name} size={60} />}</div>
      ) : (
        <Button variant="text" sx={{ color: theme.palette.accentColor.main }} href="/api/auth/login">
          Login
        </Button>
      )}
    </Container>
  );
};

export default UserBar;
