import PropTypes from 'prop-types';
import { Rating, Avatar } from '@mui/material';
import stringAvatar from '../services/avatarFormatter';
import Image from 'next/image';
import { Wrap, InfoWrap, Name } from '../styles/Review.styled';

const Review = ({ review }) => {
  const { avatar, name, rating, text, createdAt } = review;
  return (
    <Wrap
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div>
        {avatar ? (
          <Image src={avatar} alt="Avatar" width={100} height={100} />
        ) : (
          <Avatar
            {...stringAvatar(`${name}`)}
            sx={{ width: 100, height: 100, fontSize: 40 }}
          />
        )}
      </div>
      <InfoWrap>
        <Name>{name}</Name>
        <p>{createdAt}</p>
        <p>{text}</p>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          precision={0.5}
          sx={{ mt: 1 }}
        />
      </InfoWrap>
    </Wrap>
  );
};

Review.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Review;
