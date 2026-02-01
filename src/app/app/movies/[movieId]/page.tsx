"use client";

import { useTranslations } from "next-intl";
import { use } from "react";

import { MovieInfo } from "@/components/app/movies/MovieInfo";
import { MovieTabs } from "@/components/app/movies/MovieTabs";
import { useMovieInfo } from "@/hooks/stores";

const MoviePage = ({ params }: { params: Promise<{ movieId: string }> }) => {
  const t = useTranslations("app.movieInfo");
  const { movieId } = use(params);
  const movieInfo = useMovieInfo();

  if (!movieInfo) {
    return <div>{t("notFound")}</div>;
  }

  return (
    <>
      <MovieInfo movieData={movieInfo} />
      <MovieTabs movieId={movieId} />
    </>
  );
};

export default MoviePage;
