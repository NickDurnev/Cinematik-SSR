import { PropTypes } from 'prop-types';
import { useState } from 'react';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Container, Form, Wrap, StyledRating } from './AddReview.styled';

const AddReview = ({ addReview, currentUser }) => {
  const [value, setValue] = useState(2);
  const { name, picture } = currentUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ text }) => {
    const date = moment().format('DD-MM-YYYY');
    const review = {
      createdAt: date,
      name: name,
      picture: picture,
      text: text,
      rating: value.toString(),
    };
    addReview(review);

    setValue(2);
    reset();
  };
  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            placeholder="Add a comment..."
            rows="11"
            cols="55"
            {...register('text', {
              required: 'You need type something',
              maxLength: {
                value: 200,
                message: 'A maximum length is 200 symbols',
              },
              minLength: {
                value: 5,
                message: 'Longer than 5 symbols',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="text"
            render={({ message }) => (
              <p style={{ color: 'white', fontSize: '20px' }}>{message}</p>
            )}
          />
          <Wrap>
            <StyledRating
              name="Rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              precision={0.5}
              size="large"
              icon={
                <StarIcon
                  fontSize="inherit"
                  style={{
                    stroke: '#fff',
                  }}
                />
              }
              emptyIcon={
                <StarIcon
                  fontSize="inherit"
                  style={{
                    stroke: '#fff',
                  }}
                />
              }
              sx={{
                fontSize: '25px',
              }}
            />
            <button type="submit">Send</button>
          </Wrap>
        </Form>
      </div>
    </Container>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    locale: PropTypes.string,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
  }).isRequired,
};

export default AddReview;
