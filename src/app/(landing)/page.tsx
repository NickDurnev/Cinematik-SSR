import { Metadata } from "next";

//#Components
import { Companies, Hero } from "@/app/(landing)/components";

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
