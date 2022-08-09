import Head from 'next/head';
import ReviewList from '../components/ReviewList';

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/reviews');
  const data = await response.json();

  if (!data) {
    return { notFound: true };
  }

  return { props: { reviews: data } };
};

export default function Reviews({ reviews }) {
  return (
    <>
      <Head>
        <title>Reviews</title>
        <meta name="description" content="Users reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReviewList reviews={reviews} />
    </>
  );
}
