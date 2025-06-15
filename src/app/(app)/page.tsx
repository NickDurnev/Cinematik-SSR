import { Metadata } from "next";

//#Components
import { Companies, Hero } from "@/app/(app)/components";

export const metadata: Metadata = {
  title: "Home page",
};

const Home = () => {
  return (
    <div>
      <Hero />
      <Companies />
    </div>
  );
};

export default Home;
