"use client";

import { useState } from "react";

import { SearchInput, Select, ThemeSwitcher, UserMenu } from "@/components";
import useSizeScreen from "@/hooks/useSizeScreen";
import { ContentType } from "@/types/general";

interface IProps {
  onChange: (value: string) => void;
}

const TYPE_OPTIONS = [
  { label: "Movie", value: ContentType.MOVIE },
  { label: "TV Show", value: ContentType.TV },
];

export const Header = ({ onChange }: IProps) => {
  const [value, setValue] = useState<ContentType>(ContentType.MOVIE);
  const screenSize = useSizeScreen();
  const isPhone = screenSize === "phone";

  return (
    <div className=" mx-auto tablet:mr-0 mb-[60px] tablet:mb-[30px] tablet:ml-auto flex w-full flex-wrap items-start tablet:items-center justify-between px-3">
      <div className="flex tablet:flex-row flex-col items-start justify-start gap-4">
        <SearchInput onChange={onChange} width={isPhone ? "150px" : "250px"} />
        <Select
          label="Type"
          value={value}
          onChange={e => setValue(e.target.value as ContentType)}
          options={TYPE_OPTIONS}
        />
      </div>
      <div className="flex items-center gap-x-6 tablet:p-0 py-3">
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </div>
  );
};
