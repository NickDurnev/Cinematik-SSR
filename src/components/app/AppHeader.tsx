"use client";

import { useEffect, useState } from "react";

import { Select, ThemeSwitcher } from "@/components/common";
import {
  useContentType,
  useContentTypeSetter,
  useMovieGenres,
  useMovieGenresSetter,
  useTVShowGenres,
  useTVShowGenresSetter,
} from "@/hooks/stores";
import useSizeScreen from "@/hooks/useSizeScreen";
import { useAllMovieGenres } from "@/services/movies/query-hooks";
import { useAllTVShowGenres } from "@/services/tv-shows/query-hooks";
import { ContentType, ScreenType } from "@/types/general";

import { DropMenu } from "../common";
import { Filter } from "./ContentFilter";
import { ContentFiltersForm } from "./ContentFiltersForm";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";

const TYPE_OPTIONS = [
  { label: "Movie", value: ContentType.MOVIE },
  { label: "TV Show", value: ContentType.TV },
];

export const AppHeader = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  const contentValue = useContentType();
  const setContentValue = useContentTypeSetter();
  const screenSize = useSizeScreen();
  const isPhone = screenSize === ScreenType.PHONE;

  const movieGenresValue = useMovieGenres();
  const tvShowGenresValue = useTVShowGenres();
  const setMovieGenres = useMovieGenresSetter();
  const setTVShowGenres = useTVShowGenresSetter();

  const { data: movieGenres, isSuccess: movieGenresSuccess } =
    useAllMovieGenres(!movieGenresValue.length);
  const { data: tvShowGenres, isSuccess: tvShowGenresSuccess } =
    useAllTVShowGenres(!tvShowGenresValue.length);

  useEffect(() => {
    if (movieGenresSuccess) {
      setMovieGenres(movieGenres);
    }
  }, [movieGenresSuccess, movieGenres, setMovieGenres]);

  useEffect(() => {
    if (tvShowGenresSuccess) {
      setTVShowGenres(tvShowGenres);
    }
  }, [tvShowGenresSuccess, tvShowGenres, setTVShowGenres]);

  return (
    <>
      <div className="mx-auto tablet:mr-0 mb-[60px] tablet:mb-[20px] tablet:ml-auto flex w-full flex-wrap items-start tablet:items-center justify-between px-3">
        <div className="flex tablet:flex-row flex-col items-start tablet:items-center justify-start gap-4">
          <SearchInput width={isPhone ? "150px" : "250px"} />
          <div className="pt-[6px]">
            <Select
              label="Type"
              value={contentValue}
              onChange={e => setContentValue(e.target.value as ContentType)}
              options={TYPE_OPTIONS}
            />
          </div>
          <Filter isPhone={isPhone} setIsDropMenuOpen={setIsDropMenuOpen} />
        </div>
        <div className="flex items-center gap-x-6 tablet:p-0 py-3">
          <ThemeSwitcher />
          <UserMenu />
        </div>
      </div>
      <DropMenu isOpen={isDropMenuOpen}>
        <ContentFiltersForm contentValue={contentValue} />
      </DropMenu>
    </>
  );
};
