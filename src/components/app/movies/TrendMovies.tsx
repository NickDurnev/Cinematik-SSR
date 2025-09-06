import { toast } from "react-toastify";

import { CustomLink, Show, Spinner } from "@/components/common";
import { useTrendMovies } from "@/services/movies/query-hooks";

import { Swiper } from "../Swiper";

interface IProps {
  category: string;
  title: string;
}

export const TopCategoryMovies = ({ category, title }: IProps) => {
  const { data, error, isPending, isError } = useTrendMovies();

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <div className="home-movies-container">
      <CustomLink href={`/movies/${category}`} className="home-movies-title">
        {title}
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
