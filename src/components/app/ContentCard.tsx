import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";

import { Show } from "@/components/common";
import { useMovieGenres, useTVShowGenres } from "@/hooks/stores";
import { cn } from "@/libs/tailwind-merge";
import { IGenre } from "@/types/general";
import { IMovie } from "@/types/movie";
import { ITVShow } from "@/types/tv-show";

import { ImageWrapper } from "./ImageWrapper";

interface IProps {
  data: IMovie | ITVShow;
}

export const ContentCard = ({ data }: IProps) => {
  const movieGenres = useMovieGenres();
  const tvShowGenres = useTVShowGenres();
  const isMovie = "title" in data;
  const title = isMovie ? data.title : data.name;

  const contentGenre = useMemo<IGenre | null>(() => {
    const firstGenreId = data.genre_ids?.[0];
    if (!firstGenreId) {
      return null;
    }
    const list = isMovie ? movieGenres : tvShowGenres;
    if (!list?.length) {
      return null;
    }
    return list.find(({ id }) => Number(id) === firstGenreId) ?? null;
  }, [data.genre_ids, isMovie, movieGenres, tvShowGenres]);

  return (
    <div
      className={cn(
        "h-[465px] w-[310px] overflow-hidden text-link",
        !data.poster_path ? "bg-[#666666]" : "",
      )}
    >
      <div className="relative h-full">
        <Show when={contentGenre}>
          <span className="absolute top-[10px] left-[10px] rounded-lg bg-[rgba(29,29,29,0.5)] px-[5px] py-[3px] text-base text-link leading-4 backdrop-blur-[2px]">
            {contentGenre?.name}
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
