import { Metadata } from "next";

import { Companies, Hero } from "@/app/[locale]/(landing)/components";

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
