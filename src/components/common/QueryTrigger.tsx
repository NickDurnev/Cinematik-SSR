"use client";

import { forwardRef } from "react";

import { cn } from "@/libs/tailwind-merge";

type Props = {
  height?: number;
};

const QueryTrigger = forwardRef<HTMLDivElement, Props>(
  ({ height = 300 }, ref) => (
    <div className={cn(`h-[${height}px] w-full`)} ref={ref} />
  ),
);

export default QueryTrigger;
