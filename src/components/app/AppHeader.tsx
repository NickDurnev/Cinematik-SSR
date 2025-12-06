"use client";

import TuneIcon from "@mui/icons-material/Tune";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Select, Show, ThemeSwitcher } from "@/components/common";
import {
  useContentType,
  useContentTypeSetter,
  useMovieGenres,
  useMovieGenresSetter,
  useTVShowGenres,
  useTVShowGenresSetter,
} from "@/hooks/stores";
import useSizeScreen from "@/hooks/useSizeScreen";
import { cn } from "@/libs/tailwind-merge";
import { useAllMovieGenres } from "@/services/movies/query-hooks";
import { useAllTVShowGenres } from "@/services/tv-shows/query-hooks";
import { ContentType, ScreenType } from "@/types/general";

import { Button, Drawer, DropMenu } from "../common";
import { ContentFiltersForm } from "./ContentFiltersForm";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";

const TYPE_OPTIONS = [
  { label: "Movie", value: ContentType.MOVIE },
  { label: "TV Show", value: ContentType.TV },
];

export const AppHeader = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const contentValue = useContentType();
  const setContentValue = useContentTypeSetter();
  const screenSize = useSizeScreen();
  const isPhone = screenSize === ScreenType.PHONE;

  const movieGenresValue = useMovieGenres();
  const tvShowGenresValue = useTVShowGenres();
  const setMovieGenres = useMovieGenresSetter();
  const setTVShowGenres = useTVShowGenresSetter();

  const isNotPorfilePage = !usePathname().includes("profile");

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

  const handleFilterClick = () => {
    if (isPhone) {
      setIsDrawerOpen(prev => !prev);
    } else {
      setIsDropMenuOpen(prev => !prev);
    }
  };

  return (
    <>
      <div className="mx-auto tablet:mr-0 mb-[60px] tablet:mb-[20px] tablet:ml-auto flex w-full flex-wrap items-start tablet:items-center justify-between px-3">
        <Show when={isNotPorfilePage}>
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
            <div className="tablet:p-0 px-10">
              <Button
                isIconButton={true}
                aria-label="content-filters"
                onClick={handleFilterClick}
              >
                <TuneIcon sx={{ fontSize: isPhone ? 30 : 40 }} />
              </Button>
            </div>
          </div>
        </Show>
        <div
          className={cn(
            "flex items-center gap-x-6 tablet:p-0 py-3",
            !isNotPorfilePage && "ml-auto",
          )}
        >
          <ThemeSwitcher />
          <UserMenu />
        </div>
      </div>
      <DropMenu isOpen={isDropMenuOpen}>
        <ContentFiltersForm
          contentValue={contentValue}
          handleFilterClick={handleFilterClick}
        />
      </DropMenu>
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "var(--secondary)",
          color: "var(--foreground)",
        }}
      >
        <ContentFiltersForm
          contentValue={contentValue}
          handleFilterClick={handleFilterClick}
        />
      </Drawer>
    </>
  );
};
