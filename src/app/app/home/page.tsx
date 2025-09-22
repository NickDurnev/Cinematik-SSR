"use client";

import { AnimatedPage } from "@/components";
import { TopCategoryMovies, TrendMovies } from "@/components/app/movies";

const HomePage = () => {
  return (
    <AnimatedPage>
      <TrendMovies />
      <TopCategoryMovies category={"top_rated"} title={"Top rated movies"} />
      <TopCategoryMovies
        category={"upcoming"}
        title={"Upcoming rated movies"}
      />
    </AnimatedPage>
  );
};

export default HomePage;
