import { PropTypes } from 'prop-types';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Container, Form, StyledRating } from './AddReview.styled';

const AddReview = ({ addReview }) => {
  const [value, setValue] = useState(2);
  const { user } = useUser();
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
      name: `${user.name}`,
      avatar: '',
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
            })}
          />
          <ErrorMessage
            errors={errors}
            name="text"
            render={({ message }) => (
              <p style={{ color: 'white', fontSize: '20px' }}>{message}</p>
            )}
          />
          <StyledRating
            name="Rating"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            precision={0.5}
            icon={
              <StarIcon
                fontSize="inherit"
                style={{
                  width: '20px',
                  height: '20px',
                  stroke: '#fff',
                }}
              />
            }
            emptyIcon={
              <StarIcon
                fontSize="inherit"
                style={{
                  width: '20px',
                  height: '20px',
                  stroke: '#fff',
                }}
              />
            }
          />
          <button type="submit">Send</button>
        </Form>
      </div>
    </Container>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
};

export default AddReview;
