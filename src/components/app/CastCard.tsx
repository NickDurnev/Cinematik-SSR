import { motion } from "framer-motion";

import { ImageWrapper, Show } from "@/components";
import { cn } from "@/libs/tailwind-merge";
import { IActor } from "@/types/movie";
import { cardVariants } from "@/utils/animations";

import Actor404Icon from "/icons/Actor404.svg";

const CastCard = ({ data }: { data: IActor }) => {
  const { character, name, profile_path } = data;

  return (
    <motion.div
      variants={cardVariants}
      initial="closed"
      whileInView="open"
      viewport={{ once: true }}
      className={cn(
        "relative mx-auto h-[465px] w-[310px] rounded-[10px] text-[var(--color-link)]",
        !profile_path ? "bg-[#666666]" : "",
      )}
    >
      <Show
        when={profile_path}
        fallback={
          <ImageWrapper>
            <Actor404Icon className="h-auto w-[120px] stroke-current" />
          </ImageWrapper>
        }
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${profile_path}`}
          alt={name}
          className="h-auto w-full rounded-t-[10px]"
        />
      </Show>
      <div className="absolute bottom-0 left-0 h-[70px] w-full bg-[var(--color-nav-bar-bg)] px-[20px] py-[10px] text-left backdrop-blur-[12px]">
        <p className="mb-[10px] break-words font-bold text-[16px] text-[var(--color-text)] leading-[16px]">
          {name}
        </p>
        <p className="break-words text-[16px] text-[var(--color-link)] leading-[16px]">
          {character}
        </p>
      </div>
    </motion.div>
  );
};

export default CastCard;
