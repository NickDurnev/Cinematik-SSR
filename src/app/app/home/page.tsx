"use client";

import { AnimatedPage } from "@/components";
import { TopCategoryMovies, TrendMovies } from "@/components/app/movies";

const HomePage = () => {
  return (
    <AnimatedPage>
      <TopCategoryMovies category={"upcoming"} title={"Upcoming movies"} />
      <TrendMovies />
      <TopCategoryMovies category={"top_rated"} title={"Top rated movies"} />
    </AnimatedPage>
  );
};

export default HomePage;
