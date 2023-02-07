import { PropTypes } from 'prop-types';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import stringAvatar from '../../services/avatarFormatter';

const UserAvatar = ({ picture, name, size }) => {
  return (
    <>
      {picture ? (
        <Image
          src={picture}
          alt="Avatar"
          width={size}
          height={size}
          style={{ borderRadius: '50%' }}
        />
      ) : (
        <Avatar
          {...stringAvatar(`${name}`)}
          sx={{
            width: size,
            height: size,
            fontSize: 25,
            lineHeight: '25px',
            letterSpacing: '0.05em',
            backgroundColor: 'transparent',
            color: '#fff',
            border: '1px solid #fff',
          }}
        />
      )}
    </>
  );
};

UserAvatar.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default UserAvatar;
