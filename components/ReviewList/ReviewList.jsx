import PropTypes from 'prop-types';
import Review from '../Review';
import { List } from './ReviewList.styled';

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
