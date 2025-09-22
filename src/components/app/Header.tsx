"use client";

import { SearchInput, ThemeSwitcher, UserMenu } from "@/components";

interface IProps {
  onChange: (value: string) => void;
}

export const Header = ({ onChange }: IProps) => {
  return (
    <div className="mx-auto tablet:mr-0 mb-[60px] tablet:mb-[30px] tablet:ml-auto flex tablet:w-[450px] w-[320px] items-center justify-between">
      <SearchInput onChange={onChange} />
      <ThemeSwitcher />
      <UserMenu />
    </div>
  );
};
