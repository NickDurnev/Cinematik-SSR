"use client";

import { TopCategoryMovies, TrendMovies } from "@/components/app/movies";
import { TopCategoryTVShows, TrendTVShows } from "@/components/app/tv-shows";
import { AnimatedPage, Show } from "@/components/common";
import { useContentType } from "@/hooks/stores";
import { ContentType } from "@/types/general";
import { MovieCategoryType } from "@/types/movie";
import { TVShowCategoryType } from "@/types/tv-show";

const HomePage = () => {
  const contentValue = useContentType();

  return (
    <AnimatedPage>
      <Show when={contentValue === ContentType.MOVIE}>
        <TopCategoryMovies
          category={MovieCategoryType.UPCOMING}
          title={"Upcoming movies"}
        />
        <TrendMovies />
        <TopCategoryMovies
          category={MovieCategoryType.TOP_RATED}
          title={"Top rated movies"}
        />
      </Show>
      <Show when={contentValue === ContentType.TV}>
        <TopCategoryTVShows
          category={TVShowCategoryType.ON_THE_AIR}
          title={"On the air tv shows"}
        />
        <TrendTVShows />
        <TopCategoryTVShows
          category={TVShowCategoryType.TOP_RATED}
          title={"Top rated tv shows"}
        />
      </Show>
    </AnimatedPage>
  );
};

export default HomePage;
