"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";

import { Input } from "../common/Input";

interface IProps {
  onChange: (value: string) => void;
  isLoading?: boolean;
  width?: string; // e.g., "250px"
}

export const SearchInput = ({
  onChange,
  isLoading,
  width = "250px",
}: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const debounceValue = useDebounce(inputValue, 300);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    onChange(inputValue);
    router.push(`/movies?query=${encodeURIComponent(inputValue)}`);
  };

  useEffect(() => {
    if (debounceValue.trim().length) {
      onChange(debounceValue);
    }
  }, [debounceValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
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
          onChange={handleChange}
          disabled={isLoading}
          variant="outlined"
          size="small"
        />
      </div>
      <button
        type="submit"
        aria-label="search"
        className="cursor-pointer p-[10px] text-foreground"
      >
        <img src="/icons/SearchIcon.svg" alt="Search" width={20} height={20} />
      </button>
    </form>
  );
};
