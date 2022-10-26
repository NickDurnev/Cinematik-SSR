import { useState, useEffect } from 'react';
import Head from 'next/head';
import ReviewList from '../components/ReviewList';
import AddReview from '../components/AddReview';
import dbConnect from '../db/connection';
import Review from '../db/models/Review';

const BASE_URL = process.env.BASE_URL;

export default function Reviews({ data }) {
  const [reviews, setReviews] = useState([...data]);

  const addReview = async review => {
    const response = await fetch('http://localhost:3000/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
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
      <AddReview addReview={review => addReview(review)} />
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
