import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CardSkeleton, Show } from "@/components/common";
import { useSimilarTVShows } from "@/services/tv-shows/query-hooks";
import { ITVShow } from "@/types/tv-show";

import { Notify } from "../Notify";
import { Swiper } from "../Swiper";

export const SimilarTVShows = ({ tvShowId }: { tvShowId: string }) => {
  const [tvShows, setTVShows] = useState<ITVShow[]>([]);

  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    data: tvShowsData,
    isError,
    isPending,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSimilarTVShows({ tvShowId });

  useEffect(() => {
    if (isSuccess || tvShowsData?.pages?.length) {
      setHasLoaded(true);
      const allTVShows = tvShowsData.pages.flatMap(page => page.data);
      setTVShows(allTVShows);
    }
  }, [isSuccess, tvShowsData?.pages]);

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <>
      <Show
        when={hasLoaded && tvShows.length !== 0}
        fallback={
          <Notify>
            <h2>We don't have similar TV shows for this show</h2>
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70, mt: 1 }} />
          </Notify>
        }
      >
        <Swiper
          data={tvShows}
          onAutoPlay
          onReachEnd={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Show>
      <Show when={isPending}>
        <CardSkeleton />
      </Show>
    </>
  );
};
