"use client";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

import { CustomLink, Show, Spinner } from "@/components/common";
import { useMovieCast } from "@/services/movies/query-hooks";
import { IActor } from "@/types/movie";

import { CastCard } from "./CastCard";
import { Notify } from "./Notify";

export const Cast = ({ movieId }: { movieId: string }) => {
  const pathname = usePathname();

  const { data, error, isPending, isError } = useMovieCast({
    movieId,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <Show
      when={data.length !== 0}
      fallback={
        <Notify>
          <h2>We don't have info about cast for this movie</h2>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70, mt: 1 }} />
        </Notify>
      }
    >
      <ul className="mx-auto block laptopM:w-full w-[300px] py-[15px] md:grid md:w-[640px] md:grid-cols-2 md:items-stretch md:justify-items-center md:gap-[10px] xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((actor: IActor) => {
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
