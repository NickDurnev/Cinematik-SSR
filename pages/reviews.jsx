import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';
import Head from 'next/head';
import ReviewList from '../components/ReviewList';
import AddReview from '../components/AddReview';
import dbConnect from '../db/connection';
import Review from '../db/models/Review';

export default function Reviews({ data }) {
  const [reviews, setReviews] = useState([...data]);
  const { user } = useUser();

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
    setReviews([...reviews, result.data.review]);
  };

  return (
    <>
      <Head>
        <title>Reviews</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Users reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <AddReview addReview={review => addReview(review)} />}
      <ReviewList reviews={reviews} />
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  try {
    const data = await Review.find();
    console.log(data);
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
