"use client";

import { Select, ThemeSwitcher } from "@/components/common";
import { useContentType, useContentTypeSetter } from "@/hooks/stores";
import useSizeScreen from "@/hooks/useSizeScreen";
import { ContentType, ScreenType } from "@/types/general";

import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";

interface IProps {
  onChange: (value: string) => void;
}

const TYPE_OPTIONS = [
  { label: "Movie", value: ContentType.MOVIE },
  { label: "TV Show", value: ContentType.TV },
];

export const Header = ({ onChange }: IProps) => {
  const contentValue = useContentType();
  const setContentValue = useContentTypeSetter();
  const screenSize = useSizeScreen();
  const isPhone = screenSize === ScreenType.PHONE;

  return (
    <div className=" mx-auto tablet:mr-0 mb-[60px] tablet:mb-[30px] tablet:ml-auto flex w-full flex-wrap items-start tablet:items-center justify-between px-3">
      <div className="flex tablet:flex-row flex-col items-start tablet:items-center justify-start gap-4">
        <SearchInput onChange={onChange} width={isPhone ? "150px" : "250px"} />
        <div className="pt-[6px]">
          <Select
            label="Type"
            value={contentValue}
            onChange={e => setContentValue(e.target.value as ContentType)}
            options={TYPE_OPTIONS}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-6 tablet:p-0 py-3">
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </div>
  );
};
