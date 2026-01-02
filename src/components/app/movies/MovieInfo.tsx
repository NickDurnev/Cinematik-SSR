"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import StarIcon from "@mui/icons-material/Star";
import TvIcon from "@mui/icons-material/Tv";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Frame, Notify } from "@/components/app";
import { Button, CustomLink, Modal, Show } from "@/components/common";
import { useMoviesLibrary } from "@/hooks/stores";
import {
  useAddMovieToLibrary,
  useUpdateLibraryMovie,
} from "@/services/library/query-hooks";
import { useMovieTrailers } from "@/services/movies/query-hooks";
import { CategoryEnum } from "@/types/library";
import { IMovie } from "@/types/movie";

import { ImageWrapper } from "../ImageWrapper";

interface Props {
  movieData: IMovie;
}

export const MovieInfo = ({ movieData }: Props) => {
  const [movieCategory, setMovieCategory] = useState<null | CategoryEnum>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  console.log("🚀 ~ isTrailerModalOpen:", isTrailerModalOpen);
  const library = useMoviesLibrary();
  const {
    poster_path,
    release_date,
    vote_average,
    title,
    tagline,
    runtime,
    overview,
    budget,
    genres,
    genre_ids,
  } = movieData;

  const isWatched = movieCategory === CategoryEnum.WATCHED;

  const { data: movieTrailers } = useMovieTrailers({
    movieId: movieData.id.toString(),
  });
  console.log("🚀 ~ movieTrailers:", movieTrailers);
  const { mutate: addMovieToLibrary, isPending: isAddPending } =
    useAddMovieToLibrary();
  const { mutate: updateLibraryMovie, isPending: isUpdatePending } =
    useUpdateLibraryMovie();

  useEffect(() => {
    if (library.length) {
      const libraryMovie = library.find(
        movie => movie.id === `${movieData.id}`,
      );
      if (libraryMovie) {
        setMovieCategory(libraryMovie.category);
      }
    }
  }, [library, movieData.id]);

  const handleClick = () => {
    if (movieCategory) {
      updateLibraryMovie(
        {
          movie_id: `${movieData.id}`,
          category:
            movieCategory === CategoryEnum.FAVORITES
              ? CategoryEnum.WATCHED
              : CategoryEnum.FAVORITES,
        },
        {
          onError: (error: Error) => {
            toast.error(error?.message);
          },
        },
      );
    } else {
      addMovieToLibrary(
        {
          overview,
          release_date,
          title,
          tagline,
          runtime,
          genres,
          vote_average,
          genre_ids,
          poster_path,
          budget,
          category: CategoryEnum.FAVORITES,
        },
        {
          onError: (error: Error) => {
            toast.error(error?.message);
          },
        },
      );
    }
  };

  return (
    <div className="mt-[60px] tablet:flex laptopL:w-[1370px] laptopM:w-[1200px] tablet:w-[80vw] w-full tablet:items-start tablet:justify-between text-foreground">
      <div
        className={`tablet:m-0 mx-auto h-[465px] laptopM:h-[600px] tablet:h-[400px] laptopM:w-[400px] tablet:w-[250px] w-[310px] text-link ${
          !poster_path && "bg-[#666666]"
        }`}
      >
        <Show
          when={poster_path}
          fallback={
            <ImageWrapper>
              <Image
                src="/icons/Movie404.svg"
                alt="Movie placeholder"
                width={120}
                height={180}
                className="h-auto w-[120px]"
              />
            </ImageWrapper>
          }
        >
          <img
            src={`https://image.tmdb.org/t/p/w400${poster_path}`}
            alt={title}
            className="h-full w-full"
          />
        </Show>
      </div>
      <div className="mt-5 laptop:w-[640px] laptopL:w-[850px] laptopM:w-[700px] tablet:w-[380px] w-full">
        <h2 className="mb-[30px] font-technovier laptop:text-[40px] text-[30px] laptop:leading-[47px] leading-[37px]">
          {title}
        </h2>
        <Show when={tagline}>
          <h3 className="mb-5 text-xl">"{tagline}"</h3>
        </Show>
        <p className="mb-[50px] text-xl leading-5">{overview}</p>
        <ul className="mx-auto mb-5 flex laptop:w-[500px] laptopM:w-[600px] tablet:w-[350px] w-full items-center justify-between laptop:text-xl text-lg laptop:leading-5 leading-[18px]">
          <li className="laptop:mr-[120px] mr-[60px] text-left [&>p+p]:mt-[30px]">
            <p>Release date:</p>
            <Show when={runtime}>
              <p>Runtime:</p>
            </Show>
            <Show when={budget}>
              <p>Budget:</p>
            </Show>
          </li>
          <li className="text-right [&>p+p]:mt-[30px]">
            <p> {release_date}</p>
            <Show when={runtime}>
              <p>{runtime} minutes </p>
            </Show>
            <Show when={budget}>
              <p>{budget} $</p>
            </Show>
          </li>
        </ul>
        <Show when={genres?.length}>
          <ul className="mx-auto mt-[50px] flex w-full flex-wrap items-center laptop:justify-start justify-center text-link">
            {genres?.map(({ id, name }) => (
              <li key={id}>
                <CustomLink
                  href={`movies/by_genre=${id}`}
                  className="relative inline-block bg-linear-to-r bg-position-[-100%] bg-size-[200%_100%] from-50% from-link to-50% to-black bg-clip-text px-[30px] py-[15px] text-center font-sans text-transparent uppercase transition-all duration-300 ease-linear before:absolute before:bottom-[-3px] before:left-0 before:block before:h-[3px] before:w-0 before:bg-link before:transition-all before:duration-300 before:ease-in-out before:content-[''] hover:bg-[0] hover:before:w-full"
                >
                  {name}
                </CustomLink>
              </li>
            ))}
          </ul>
        </Show>
        <div className="mx-auto laptop:mt-[110px] mt-[50px] laptop:flex laptop:w-[550px] laptop:items-center laptop:justify-between">
          <Button
            type="button"
            onClick={() => setIsTrailerModalOpen(true)}
            endIcon={<PlayArrowIcon fontSize="inherit" />}
            className="mx-auto laptop:mb-0 mb-[30px] w-[220px] px-5 py-2.5 font-semibold! text-[1.5rem]!"
          >
            Watch Trailer
          </Button>
          <Show
            when={movieCategory}
            fallback={
              <Button
                onClick={handleClick}
                aria-label="Add to favorites"
                disabled={isAddPending || isWatched}
                endIcon={!isAddPending && <StarIcon fontSize="inherit" />}
                loading={isAddPending}
                loadingPosition="end"
                className="font-semibold! text-[1.5rem]!"
              >
                Add to favorites
              </Button>
            }
          >
            <Button
              onClick={handleClick}
              aria-label="Add to watched"
              disabled={isUpdatePending || isWatched}
              endIcon={!isUpdatePending && <TvIcon fontSize="inherit" />}
              loading={isUpdatePending}
              loadingPosition="end"
              className="font-semibold! text-[1.5rem]!"
            >
              Add to watched
            </Button>
          </Show>
        </div>
      </div>
      <AnimatePresence>
        {isTrailerModalOpen && (
          <Modal onModal={() => setIsTrailerModalOpen(false)}>
            <div className="flex items-center justify-center">
              <Show
                when={movieTrailers?.length}
                fallback={
                  <Notify>
                    <h2>We don't have trailer for this movie</h2>
                    <SentimentVeryDissatisfiedIcon
                      sx={{ fontSize: 70, mt: 1 }}
                    />
                  </Notify>
                }
              >
                <Frame
                  youtubeURL="https://www.youtube-nocookie.com/embed/"
                  movieTrailer={
                    movieTrailers?.find(
                      t =>
                        t.site === "YouTube" &&
                        t.name.toLowerCase().includes("trailer"),
                    )?.key ??
                    movieTrailers?.find(t => t.site === "YouTube")?.key ??
                    movieTrailers?.[0]?.key ??
                    ""
                  }
                />
              </Show>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
