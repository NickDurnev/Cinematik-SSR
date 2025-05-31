import Head from "next/head";

//#Components
import { Companies, Hero } from "@/components";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Hero />
      <Companies />
    </>
  );
};

export default Home;
