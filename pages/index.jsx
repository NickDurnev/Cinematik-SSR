import Head from 'next/head';
import Hero from '../components/Hero';
import Companies from '../components/Companies';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="App for searching movies" />
        <link rel="icon" href="/vercel.svg" />
      </Head>

      <Hero />
      <Companies />
    </>
  );
}
