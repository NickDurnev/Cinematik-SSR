import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CustomLink, Show, SwiperSkeleton } from "@/components/common";
import { useTrendTVShows } from "@/services/tv-shows/query-hooks";
import { ITVShow } from "@/types/tv-show";

import { Swiper } from "../Swiper";

export const TrendTVShows = () => {
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
  } = useTrendTVShows();

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
      <CustomLink href={"/tv-shows/trending"} className="home-content-title">
        Trend TV Shows
      </CustomLink>
      <Show when={hasLoaded && shows.length !== 0}>
        <Swiper
          data={shows}
          onReachEnd={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onAutoPlay
        />
      </Show>
      <Show when={isPending}>
        <SwiperSkeleton />
      </Show>
    </div>
  );
};
