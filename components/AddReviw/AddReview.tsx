import { useState } from 'react';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { IUser, IReview } from '../../services/interfaces';
import { Container, Form, Wrap, StyledRating } from './AddReview.styled';

interface IProps {
  addReview: (review: IReview) => void;
  currentUser: IUser;
}

const AddReview = ({ addReview, currentUser }: IProps) => {
  const [value, setValue] = useState<number | null>(2);
  const { name, picture } = currentUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ text }: { text: string }): Promise<void> => {
    const date = moment().format('DD-MM-YYYY');
    const review = {
      createdAt: date,
      name: name,
      picture: picture,
      text: text,
      rating: value?.toString(),
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
            rows={11}
            cols={55}
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
              onChange={(e, newValue) => {
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

export default AddReview;
