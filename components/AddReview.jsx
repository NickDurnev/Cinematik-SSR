import { PropTypes } from 'prop-types';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { Rating } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Container, Form } from '../styles/addReview.styled';

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
    if (!user) {
      toast('You should be logged in for review');
      console.log('111');
      return;
    }
    const review = {
      createdAt: date,
      name: `${user.name}`,
      avatar: '',
      text: text,
      rating: value,
      id: uuidv4(),
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
            placeholder="Type your review"
            rows="5"
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
          <Rating
            name="Rating"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            precision={0.5}
            sx={{ mt: 2, mb: 2 }}
          />
          <button type="submit">Submit</button>
        </Form>
      </div>
    </Container>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
};

export default AddReview;
