import PropTypes from 'prop-types';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { Wrap, InfoWrap, Name } from '../styles/Review.styled';

const Review = ({ review }) => {
  const { avatar, name, rating, text } = review;
  return (
    <Wrap>
      <div>
        <Image src={avatar} alt="Avatar" width={100} height={100} />
      </div>
      <InfoWrap>
        <Name>{name}</Name>
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
    })
  ),
};

export default Review;
