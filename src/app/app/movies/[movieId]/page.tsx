"use client";

import { use } from "react";

import { MovieInfo } from "@/components/app/movies/MovieInfo";
import { MovieTabs } from "@/components/app/movies/MovieTabs";
import { useMovieInfo } from "@/hooks/stores";

const MoviePage = ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = use(params);
  const movieInfo = useMovieInfo();

  if (!movieInfo) {
    return <div>Movie not found</div>;
  }

  return (
    <>
      <MovieInfo movieData={movieInfo} />
      <MovieTabs movieId={movieId} />
    </>
  );
};

export default MoviePage;
