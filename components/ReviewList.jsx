import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Review from './Review';
import { device } from '../services/deviceSizes';

const List = styled.ul`
  padding: 10px 10vw;
  background-color: var(--addBgColor);

  @media ${device.tablet} {
    padding: 30px 20vw;
  }

  @media ${device.laptop} {
    padding: 30px 30vw;
  }
`;

const ReviewList = ({ reviews }) => {
  if (!reviews) {
    return null;
  }

  return (
    <List>
      {reviews.map(review => (
        <Review review={review} key={review._id} />
      ))}
    </List>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      rating: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default ReviewList;
