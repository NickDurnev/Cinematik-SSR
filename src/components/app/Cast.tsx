"use client";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

import { CustomLink, Show, Spinner } from "@/components/common";
import { cn } from "@/libs/tailwind-merge";
import { useMovieCast } from "@/services/movies/query-hooks";
import { useTVShowCast } from "@/services/tv-shows/query-hooks";
import { IActor } from "@/types/general";
import {
  BASE_CARD_CLASSES,
  RESPONSIVE_CARD_CLASSES,
  TABLET_CARD_CLASSES,
} from "@/utils/constants";

import { CastCard } from "./CastCard";
import { Notify } from "./Notify";

export const Cast = ({
  movieId,
  isTVShow = false,
}: {
  movieId: string;
  isTVShow?: boolean;
}) => {
  const pathname = usePathname();

  const movieCast = useMovieCast({ movieId });
  const tvShowCast = useTVShowCast({ tvShowId: movieId });

  const { data, error, isPending, isError } = isTVShow ? tvShowCast : movieCast;

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <Show
      when={data && data.length !== 0}
      fallback={
        <Notify>
          <h2>
            We don't have info about cast for this{" "}
            {isTVShow ? "TV show" : "movie"}
          </h2>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70, mt: 1 }} />
        </Notify>
      }
    >
      <ul
        className={cn(
          BASE_CARD_CLASSES,
          TABLET_CARD_CLASSES,
          RESPONSIVE_CARD_CLASSES,
        )}
      >
        {data?.map((actor: IActor) => {
          const { id, cast_id } = actor;
          return (
            <li key={cast_id} className="[&+li]:mt-5 md:[&+li]:mt-0">
              <CustomLink href={`${pathname}/actor/${id}`}>
                <CastCard data={actor} />
              </CustomLink>
            </li>
          );
        })}
      </ul>
    </Show>
  );
};
