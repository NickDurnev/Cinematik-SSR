import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Review from './Review';

const List = styled.ul`
  padding: 20px 25vw;
  background-color: var(--addBgColor);
`;

const ReviewList = ({ reviews }) => {
  if (!reviews) {
    return null;
  }

  return (
    <List>
      {reviews.map(review => (
        <Review review={review} key={review.id} />
      ))}
    </List>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      rating: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default ReviewList;
