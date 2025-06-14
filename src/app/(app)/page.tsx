import { Metadata } from "next";

//#Components
import { Companies, Hero } from "@/components";

export const metadata: Metadata = {
  title: "Home page",
};

const Home = () => {
  return (
    <>
      <Hero />
      <Companies />
    </>
  );
};

export default Home;
