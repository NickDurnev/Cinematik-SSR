"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/libs/tailwind-merge";
import { IActor } from "@/types/movie";
import { cardVariants } from "@/utils/animations";

import { Show } from "../common";
import { ImageWrapper } from "./ImageWrapper";

export const CastCard = ({ data }: { data: IActor }) => {
  const { character, name, profile_path } = data;

  return (
    <motion.div
      variants={cardVariants}
      initial="closed"
      whileInView="open"
      viewport={{ once: true }}
      className={cn(
        "relative mx-auto h-[465px] w-[310px] rounded-[10px] text-link",
        !profile_path ? "bg-[#666666]" : "",
      )}
    >
      <Show
        when={profile_path}
        fallback={
          <ImageWrapper>
            <Image
              src="/icons/Actor404.svg"
              alt="Actor placeholder"
              width={120}
              height={180}
              className="h-auto w-[120px]"
            />
          </ImageWrapper>
        }
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${profile_path}`}
          alt={name}
          className="h-auto w-full rounded-t-[10px]"
        />
      </Show>
      <div className="absolute bottom-0 left-0 h-[70px] w-full bg-nav-bar-bg px-[20px] py-[10px] text-left backdrop-blur-[12px]">
        <p className="mb-[10px] break-words font-bold text-[16px] leading-[16px]">
          {name}
        </p>
        <p className="break-words text-[16px] text-link leading-[16px]">
          {character}
        </p>
      </div>
    </motion.div>
  );
};
