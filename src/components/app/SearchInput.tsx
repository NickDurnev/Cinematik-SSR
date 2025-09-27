"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useSearchValue, useSearchValueSetter } from "@/hooks/stores";
import { useDebounce } from "@/hooks/useDebounce";

import { Input } from "../common";

interface IProps {
  isLoading?: boolean;
  width?: string; // e.g., "250px"
}

export const SearchInput = ({ isLoading, width = "250px" }: IProps) => {
  const searchValue = useSearchValue();
  const setSearchValue = useSearchValueSetter();

  const [inputValue, setInputValue] = useState(searchValue);
  const debounceValue = useDebounce(inputValue, 300);
  const router = useRouter();
  const pathName = usePathname();

  const isAppPage = pathName === "/app/home";

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    setSearchValue(inputValue);
    if (isAppPage) {
      return;
    }
    router.push("/app/home");
  };

  useEffect(() => {
    if (debounceValue.trim().length) {
      setSearchValue(debounceValue);
    }
  }, [debounceValue, setSearchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (!value) {
      setSearchValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-[10px]"
      style={{ width }}
      aria-label="search-form"
    >
      <div className="flex-1">
        <Input
          placeholder="Search..."
          value={inputValue}
          onChange={handleChange}
          disabled={isLoading}
          variant="outlined"
          size="small"
        />
      </div>
    </form>
  );
};
