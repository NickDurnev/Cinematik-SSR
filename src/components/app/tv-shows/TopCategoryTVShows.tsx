import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CustomLink, Show, SwiperSkeleton } from "@/components/common";
import { useCategoryTVShows } from "@/services/tv-shows/query-hooks";
import { ITVShow, TVShowCategoryType } from "@/types/tv-show";

import { Swiper } from "../Swiper";

interface IProps {
  category: TVShowCategoryType;
  title: string;
}

export const TopCategoryTVShows = ({ category, title }: IProps) => {
  const [shows, setShows] = useState<ITVShow[]>([]);

  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    data: showsData,
    isError,
    isPending,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCategoryTVShows({ category });

  useEffect(() => {
    if (isSuccess || showsData?.pages?.length) {
      setHasLoaded(true);
      const allShows = showsData.pages.flatMap(page => page.data);
      setShows(allShows);
    }
  }, [isSuccess, showsData?.pages]);

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <div className="home-content-container swiper-container">
      <CustomLink href={`/tv-shows/${category}`} className="home-content-title">
        {title}
      </CustomLink>
      <Show when={hasLoaded && shows.length !== 0}>
        <Swiper
          data={shows}
          onReachEnd={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Show>
      <Show when={isPending}>
        <SwiperSkeleton />
      </Show>
    </div>
  );
};
