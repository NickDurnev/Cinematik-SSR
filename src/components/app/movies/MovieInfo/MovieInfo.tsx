"use client";

// import StarIcon from "@mui/icons-material/Star";
// import TvIcon from "@mui/icons-material/Tv";
import Image from "next/image";
// import { MouseEventHandler, useEffect, useState } from "react";
import { MouseEventHandler } from "react";

// import { toast } from "react-toastify";

import { Button, CustomLink, ImageWrapper, Show } from "@/components";
// import { UserStore, useUserStore } from "@/hooks/stores";
// import {
//   useAddMovieToLibrary,
//   useDeleteLibraryMovie,
//   useUpdateLibraryMovie,
// } from "@/services/movies/query-hooks";
import { IMovie } from "@/types/movie";

interface IProps {
  movieData: IMovie;
  handleTrailerToggle: MouseEventHandler<HTMLButtonElement>;
}

export const MovieInfo = ({ movieData, handleTrailerToggle }: IProps) => {
  // const [movieCategory, setMovieCategory] = useState<null | string>(null);
  // const user = useUserStore((state: UserStore) => state.user);

  const {
    // id,
    poster_path,
    release_date,
    // vote_average,
    title,
    tagline,
    runtime,
    overview,
    budget,
    genres,
  } = movieData;

  // const dataToFetch = {
  //   id,
  //   poster_path,
  //   title,
  //   vote_average,
  //   genres,
  //   release_date,
  //   tagline,
  //   runtime,
  //   overview,
  //   budget,
  // };

  // useEffect(() => {
  //   if (categoryData) {
  //     const { category } = categoryData.data;
  //     if (category) {
  //       setMovieCategory(category);
  //     }
  //   }
  // }, [categoryData]);

  return (
    <div className="mt-[60px] tablet:flex laptopL:w-[1370px] laptopM:w-[1200px] tablet:w-[80vw] w-full tablet:items-start tablet:justify-between text-[var(--text-color)]">
      <div
        className={`tablet:m-0 mx-auto h-[465px] laptopM:h-[600px] tablet:h-[400px] laptopM:w-[400px] tablet:w-[250px] w-[310px] text-[var(--link-color)] ${
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
        <ul className="mx-auto mb-5 tablet:ml-0 flex laptop:w-[500px] laptopM:w-[600px] tablet:w-[350px] w-full items-center justify-between laptopL:pl-[10px] pl-[5px] laptop:text-xl text-lg laptop:leading-5 leading-[18px]">
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
        <ul className="mx-auto mt-[50px] flex w-full flex-wrap items-center laptop:justify-start justify-center text-[var(--link-color)]">
          {genres.map(({ id, name }) => (
            <li key={id}>
              <CustomLink
                href={`/movies/by_genre=${id}`}
                className="relative inline-block bg-[-100%] bg-[length:200%_100%] bg-gradient-to-r from-50% from-[var(--link-color)] to-50% to-black bg-clip-text px-[30px] py-[15px] text-center font-sans text-transparent uppercase transition-all duration-300 ease-linear before:absolute before:bottom-[-3px] before:left-0 before:block before:h-[3px] before:w-0 before:bg-[var(--link-color)] before:transition-all before:duration-300 before:ease-in-out before:content-[''] hover:bg-[0] hover:before:w-full"
              >
                {name}
              </CustomLink>
            </li>
          ))}
        </ul>
        <div className="laptop:mt-[110px] mt-[50px] ml-0 laptop:flex laptop:w-[550px] laptop:items-center laptop:justify-between">
          <Button
            type="button"
            onClick={handleTrailerToggle}
            className="mx-auto laptop:mb-0 mb-[30px] w-[220px] px-5 py-2.5"
          >
            Watch Trailer
          </Button>
          {/* <Show
            when={movieCategory}
            fallback={
              <Button
                // onClick={() => addToFavorite()}
                type="button"
                disabled={movieCategory === "watched"}
                endIcon={<StarIcon />}
                className="mx-auto flex w-[290px] cursor-pointer items-center justify-between px-[30px] py-2.5"
              >
                Add to favorites
              </Button>
            }
          >
            <Button
              // onClick={() => addToWatched()}
              type="button"
              disabled={movieCategory === "watched"}
              endIcon={<TvIcon />}
              className="mx-auto flex w-[290px] cursor-pointer items-center justify-between px-[30px] py-2.5"
            >
              Add to watched
            </Button>
          </Show> */}
        </div>
      </div>
    </div>
  );
};
