"use client";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";

import { useMovieCast } from "@/services/movies/query-hooks";
import { IActor } from "@/types/movie";

import { Spinner } from "../common/Loaders/Spinner";
import { CastCard } from "./CastCard";
import { Notify } from "./Notify";

export const Cast = () => {
  const params = useParams<{ movieId: string }>();
  const pathname = usePathname();
  const movieId = params?.movieId;

  const { data, error, isLoading, isError, isSuccess } = useMovieCast({
    movieId: String(movieId),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return toast.error(`Error: ${(error as Error).message}`);
  }

  if (isSuccess) {
    if (data.cast.length === 0) {
      return (
        <Notify>
          <h2>We don't have info about cast for this movie</h2>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70, mt: 1 }} />
        </Notify>
      );
    }

    return (
      <ul className="mx-auto block laptopM:w-full w-[300px] py-[15px] md:grid md:w-[640px] md:grid-cols-2 md:items-stretch md:justify-items-center md:gap-[10px] xl:grid-cols-4 2xl:grid-cols-5">
        {data.cast.map((actor: IActor) => {
          const { id, cast_id } = actor;
          return (
            <li key={cast_id} className="[&+li]:mt-5 md:[&+li]:mt-0">
              <Link href={`${pathname}/actor/${id}`}>
                <CastCard data={actor} />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
};
