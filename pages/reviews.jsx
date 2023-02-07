import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import ReviewList from '../components/ReviewList';
import AddReview from '../components/AddReviw';
import dbConnect from '../db/connection';
import Review from '../db/models/Review';
import { Section } from '../styles/reviews.styled';

const Reviews = ({ data, currentUser }) => {
  const [reviews, setReviews] = useState([...data]);
  const [isLeftReview, setIsLeftReview] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setIsLeftReview(currentUser.leftReview);
    }
  }, [currentUser]);

  const addReview = async review => {
    const response = await fetch('api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (!result.data) {
      toast.error('Invalid data');
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
          <AddReview addReview={review => addReview(review)} />
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
    const data = await Review.find();
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
