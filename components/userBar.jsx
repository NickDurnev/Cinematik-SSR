import { Button } from '@mui/material';

const UserBar = ({ authData }) => {
  const { user, error, isLodaing } = authData;
  if (isLodaing) {
    return <div>IsLoading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      {user ? (
        <div>
          <h3>Welcome {user.name}</h3>
          <a href="/api/auth/logout">Logout</a>
          <Button
            sx={{ ml: '20px' }}
            variant="contained"
            color="accentColor"
            href="https://nickdurnev.github.io/goit-react-hw-05-movies/"
          >
            Go to App
          </Button>
        </div>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </>
  );
};

export default UserBar;
