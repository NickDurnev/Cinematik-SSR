"use client";

import { use, useEffect } from "react";

import { MovieInfo } from "@/components/app/movies/MovieInfo";
import { MovieTabs } from "@/components/app/movies/MovieTabs";
import { useMovieInfoSetter } from "@/hooks/stores";
import { useMovieDetails } from "@/services/movies/query-hooks";

const MoviePage = ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = use(params);
  const { data: movieData } = useMovieDetails({ movieId });
  const setMovieInfo = useMovieInfoSetter();

  useEffect(() => {
    if (movieData) {
      setMovieInfo(movieData);
    }
  }, [movieData, setMovieInfo]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MovieInfo movieData={movieData} />
      <MovieTabs movieId={movieId} />
    </>
  );
};

export default MoviePage;
