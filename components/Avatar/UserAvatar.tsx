import { Avatar } from '@mui/material';
import Image from 'next/image';
import stringAvatar from '../../services/avatarFormatter';
import { IUser } from '../../services/interfaces';

interface IProps {
  picture?: IUser['picture'];
  name: IUser['name'];
  size: number;
}

const UserAvatar = ({ picture, name, size }: IProps) => {
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

export default UserAvatar;
