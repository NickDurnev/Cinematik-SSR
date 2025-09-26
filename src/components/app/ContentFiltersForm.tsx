import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { useMovieGenres, useTVShowGenres } from "@/hooks/stores";
import { ContentType, Option } from "@/types/general";

import { Autocomplete } from "../common";

type ContentFiltersProps = {
  contentValue: ContentType;
};

// const DATE_OPTIONS = [
//   { label: "Latest", value: "latest" },
//   { label: "Oldest", value: "oldest" },
// ];

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Release Date", value: "primary_release_date.desc" },
  { label: "Vote Average", value: "vote_average.desc" },
];

export const ContentFiltersForm = ({ contentValue }: ContentFiltersProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const movieGenres = useMovieGenres();
  const tvShowGenres = useTVShowGenres();

  const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);
  const [selectedSort, setSelectedSort] = useState<Option>(SORT_OPTIONS[0]);
  console.log("🚀 ~ selectedSort:", selectedSort);
  console.log("🚀 ~ selectedGenres:", selectedGenres);

  const isAppPage = pathName === "/app/home";

  const contentGenres = useMemo<Option[] | null>(() => {
    const list =
      contentValue === ContentType.MOVIE ? movieGenres : tvShowGenres;
    if (!list?.length) {
      return null;
    }
    return list.map(({ id, name }) => ({ label: name, value: id }));
  }, [movieGenres, tvShowGenres]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        className="flex flex-wrap items-center gap-2"
        aria-label="search-form"
      >
        <div className="w-[300px]">
          <Autocomplete
            options={contentGenres || []}
            label="Genres"
            placeholder="All genres"
            onChange={value => setSelectedGenres(value as Option[])}
            value={selectedGenres}
          />
        </div>
        <div className="w-[200px]">
          <Autocomplete
            options={SORT_OPTIONS}
            multiple={false}
            label="Show first by"
            placeholder="Popularity"
            onChange={value => setSelectedSort(value as Option)}
            value={[selectedSort]}
          />
        </div>
      </form>
    </div>
  );
};
