import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Show } from "@/components/common";
import { useMoviesGenres } from "@/hooks/stores";
import { cn } from "@/libs/tailwind-merge";
import { IGenre } from "@/types/general";
import { IMovie } from "@/types/movie";
import { ITVShow } from "@/types/tv-show";

import { ImageWrapper } from "./ImageWrapper";

interface IProps {
  data: IMovie | ITVShow;
}

export const ContentCard = ({ data }: IProps) => {
  const [movieGenre, setMovieGenre] = useState<IGenre | null>(null);
  const genres = useMoviesGenres();
  const title = "title" in data ? data.title : data.name;

  useEffect(() => {
    if (genres?.length && data.genre_ids.length) {
      const movieGenre = genres.find(
        ({ id }) => Number(id) === data.genre_ids[0],
      );
      if (movieGenre) {
        setMovieGenre(movieGenre);
      }
    }
  }, [genres, data.genre_ids]);

  return (
    <div
      className={cn(
        "h-[465px] w-[310px] overflow-hidden text-link",
        !data.poster_path ? "bg-[#666666]" : "",
      )}
    >
      <div className="relative h-full">
        <Show when={movieGenre}>
          <span className="absolute top-[10px] left-[10px] rounded-[0px_10px] bg-[rgba(29,29,29,0.5)] px-[5px] text-base text-link leading-4 backdrop-blur-[2px]">
            {movieGenre?.name}
          </span>
        </Show>

        <Show
          when={data.poster_path}
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
            src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
            alt={title}
            className="h-full w-full rounded-t-[10px] bg-gradient-to-b from-[rgba(29,29,29,0)] to-[rgba(29,29,29,0.8)]"
          />
        </Show>

        <div className="absolute bottom-0 left-0 flex h-[90px] w-full flex-col items-start justify-between bg-nav-bar-bg p-[15px_10px] text-start backdrop-blur-[12px]">
          <p className="whitespace-normal break-all font-medium text-base leading-4 md:font-normal md:text-lg">
            {title}
          </p>

          <Show when={data.vote_average > 0}>
            <Rating
              name="read-only"
              value={Number(data.vote_average.toFixed(1)) / 2}
              readOnly
              precision={0.5}
              icon={
                <StarIcon
                  fontSize="inherit"
                  style={{
                    width: "18px",
                    height: "18px",
                    stroke: "#FFDF37",
                  }}
                />
              }
              emptyIcon={
                <StarIcon
                  fontSize="inherit"
                  style={{
                    width: "18px",
                    height: "18px",
                    stroke: "#FFDF37",
                  }}
                />
              }
            />
          </Show>
        </div>
      </div>
    </div>
  );
};
