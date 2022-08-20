import { useState, useEffect } from 'react';
import Head from 'next/head';
import ReviewList from '../components/ReviewList';
import AddReview from '../components/AddReview';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const response = await fetch('https://cinematik.vercel.app/api/reviews');
    const data = await response.json();

    if (!data) {
      return { notFound: true };
    }
    setReviews(data);
  };

  const addReview = async review => {
    const response = await fetch('https://cinematik.vercel.app/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Head>
        <title>Reviews</title>
        <meta name="description" content="Users reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddReview addReview={review => addReview(review)} />
      <ReviewList reviews={reviews} />
    </>
  );
}
