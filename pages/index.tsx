import Head from 'next/head';
//#Components
import Hero from '../components/Hero';
import Companies from '../components/Companies';
//#Services
import { IUser } from '../services/interfaces';

const Home = ({ currentUser }: { currentUser: IUser }) => {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="App for searching movies" />
      </Head>
      <Hero currentUser={currentUser} />
      <Companies />
    </>
  );
};

export default Home;
