import { useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
//#DB
import dbConnect from '../db/connection';
import Review from '../db/models/Review';
//#Services
import { IReview, IUser } from '../services/interfaces';
//#Components
import ReviewList from '../components/ReviewList';
import AddReview from '../components/AddReview';
//#Styles
import { Section } from '../../styles/reviews.styled';

interface IProps {
  data: IReview[];
  currentUser: IUser;
  isLeftReview: IUser['leftReview'];
  setIsLeftReview: (isLeftReview: boolean) => void;
}

const Reviews = ({
  data,
  currentUser,
  isLeftReview,
  setIsLeftReview,
}: IProps) => {
  const [reviews, setReviews] = useState([...data]);

  const addReview = async (review: IReview): Promise<void> => {
    try {
      const response = await fetch('api/reviews', {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (!result.data) {
        toast.error(result.message);
        return;
      }
      await fetch('api/users/review', {
        method: 'PATCH',
        body: JSON.stringify({ email: currentUser.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setReviews([...reviews, result.data.review]);
      setIsLeftReview(true);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('An error occurred while adding the review.');
    }
  };

  return (
    <Section>
      <Head>
        <title>Reviews</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Users reviews" />
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <h2>Reviews</h2>
      <div>
        {currentUser && !isLeftReview && (
          <AddReview
            addReview={review => addReview(review)}
            currentUser={currentUser}
          />
        )}
        <ReviewList reviews={reviews} />
      </div>
    </Section>
  );
};

export default Reviews;

export async function getServerSideProps() {
  await dbConnect();
  try {
    const data = await Review.find().exec();
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
