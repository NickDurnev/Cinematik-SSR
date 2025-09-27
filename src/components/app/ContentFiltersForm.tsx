import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  useContentFilters,
  useContentFiltersSetter,
  useMovieGenres,
  useTVShowGenres,
} from "@/hooks/stores";
import { ContentType, DateOption, Option } from "@/types/general";
import { DEFAULT_CONTENT_FILTERS } from "@/utils/constants";
import { getCurrentDate } from "@/utils/dates";

import { Autocomplete, Button, Select } from "../common";

type Props = {
  contentValue: ContentType;
};

const DATE_OPTIONS = [
  { label: "1950s", value: "1950-01-01" },
  { label: "1960s", value: "1960-01-01" },
  { label: "1970s", value: "1970-01-01" },
  { label: "1980s", value: "1980-01-01" },
  { label: "1990s", value: "1990-01-01" },
  { label: "2000s", value: "2000-01-01" },
  { label: "2010s", value: "2010-01-01" },
  { label: "2020s", value: "2020-01-01" },
  { label: "Current", value: getCurrentDate() },
];

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Release Date", value: "primary_release_date.desc" },
  { label: "Vote Average", value: "vote_average.desc" },
];

export const ContentFiltersForm = ({ contentValue }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const movieGenres = useMovieGenres();
  const tvShowGenres = useTVShowGenres();
  const contentFilters = useContentFilters();
  const setContentFilters = useContentFiltersSetter();

  const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);
  const [selectedSort, setSelectedSort] = useState<Option>(SORT_OPTIONS[0]);
  const [startDate, setStartDate] = useState<DateOption | null>(null);
  const [endDate, setEndDate] = useState<DateOption | null>(null);

  useEffect(() => {
    if (contentFilters) {
      setSelectedGenres(contentFilters.selectedGenres);
      setSelectedSort(contentFilters.selectedSort || SORT_OPTIONS[0]);
      setStartDate(contentFilters.startDate);
      setEndDate(contentFilters.endDate);
    }
  }, [contentFilters]);

  const isAppPage = pathName === "/app/home";
  const isButtonDisabled = !!(
    (startDate && !endDate) ||
    (!startDate && endDate)
  );

  const contentGenres = useMemo<Option[] | null>(() => {
    const list =
      contentValue === ContentType.MOVIE ? movieGenres : tvShowGenres;
    if (!list?.length) {
      return null;
    }
    return list.map(({ id, name }) => ({ label: name, value: id }));
  }, [movieGenres, tvShowGenres]);

  const handleSelectDate = (selectedValue: string, type: "start" | "end") => {
    const idx = DATE_OPTIONS.findIndex(({ value }) => value === selectedValue);
    if (idx === -1) {
      return;
    }

    const date: DateOption = { value: selectedValue, index: idx };

    if (type === "start") {
      if (endDate && date.index > endDate.index) {
        setEndDate(null);
      }
      setStartDate(date);
    } else if (type === "end") {
      if (startDate && date.index < startDate.index) {
        setStartDate(null);
      }
      setEndDate(date);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContentFilters({
      selectedGenres,
      selectedSort,
      startDate,
      endDate,
    });
    if (isAppPage) {
      return;
    }
    router.push("/app/home");
  };

  return (
    <div className="px-3 py-6 text-start text-foreground">
      <h2 className="font-semibold text-2xl">Filters</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-4"
        aria-label="search-form"
      >
        <Autocomplete
          options={contentGenres || []}
          label="Genres"
          placeholder="All genres"
          onChange={value => setSelectedGenres(value as Option[])}
          value={selectedGenres}
          sx={{ width: "250px" }}
        />
        <Autocomplete
          options={SORT_OPTIONS}
          multiple={false}
          label="Show first by"
          placeholder="Popularity"
          onChange={value => setSelectedSort(value as Option)}
          value={selectedSort}
          sx={{ width: "200px" }}
        />
        <div className="flex gap-4">
          <Select
            options={DATE_OPTIONS}
            label="From"
            onChange={e => handleSelectDate(e.target.value as string, "start")}
            value={startDate?.value ?? ""}
            sx={{ width: "150px", height: "55px" }}
          />
          <Select
            options={DATE_OPTIONS}
            label="To"
            onChange={e => handleSelectDate(e.target.value as string, "end")}
            value={endDate?.value ?? ""}
            sx={{ width: "150px", height: "55px" }}
          />
        </div>
        <Button
          disabled={isButtonDisabled}
          type="submit"
          customVariant="secondary"
        >
          Apply
        </Button>
        <Button
          onClick={() => {
            setContentFilters(DEFAULT_CONTENT_FILTERS);
          }}
          customVariant="secondary"
        >
          Clear
        </Button>
      </form>
    </div>
  );
};
