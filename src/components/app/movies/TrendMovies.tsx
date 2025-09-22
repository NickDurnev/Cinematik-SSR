import { toast } from "react-toastify";

import { CustomLink, Show, Spinner } from "@/components/common";
import { useTrendMovies } from "@/services/movies/query-hooks";

import { Swiper } from "../Swiper";

export const TrendMovies = () => {
  const { data, error, isPending, isError } = useTrendMovies();

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <div className="home-movies-container">
      <CustomLink href={"/movies/trending"} className="home-movies-title">
        Trend movies
      </CustomLink>
      <Show when={data?.length !== 0}>
        <Swiper movies={data ?? []} onAutoPlay />
      </Show>
      <Show when={isPending}>
        <Spinner />
      </Show>
    </div>
  );
};
