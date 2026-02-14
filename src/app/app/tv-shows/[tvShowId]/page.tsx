"use client";

import { use, useEffect } from "react";

import { TVShowInfo } from "@/components/app/tv-shows/TVShowInfo";
import { TVShowTabs } from "@/components/app/tv-shows/TVShowTabs";
import { useTVShowInfoSetter } from "@/hooks/stores";
import { useTVShowDetails } from "@/services/tv-shows/query-hooks";

const TVShowPage = ({ params }: { params: Promise<{ tvShowId: string }> }) => {
  const { tvShowId } = use(params);
  const { data: tvShowData } = useTVShowDetails({ tvShowId });
  const setTVShowInfo = useTVShowInfoSetter();

  useEffect(() => {
    if (tvShowData) {
      setTVShowInfo(tvShowData);
    }
  }, [tvShowData, setTVShowInfo]);

  if (!tvShowData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TVShowInfo tvShowData={tvShowData} />
      <TVShowTabs tvShowId={tvShowId} />
    </>
  );
};

export default TVShowPage;
