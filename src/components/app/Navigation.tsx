"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/tailwind-merge";

import { CustomLink } from "../common";
import {
  HomeIcon,
  MovieIcon,
  PairsIcon,
  StarIcon,
  WatchedIcon,
} from "../icons";

const navItems = [
  { href: "/app/home", icon: HomeIcon, label: "Home" },
  { href: "/movies", icon: MovieIcon, label: "Movies" },
  { href: "/app/pairs", icon: PairsIcon, label: "Pairs" },
  { href: "/favorites", icon: StarIcon, label: "Favorites" },
  { href: "/watched", icon: WatchedIcon, label: "Watched" },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="mt-0 tablet:mt-[125px] flex h-auto tablet:flex-col items-center tablet:justify-start justify-around">
      {navItems.map(({ href, icon: Icon, label }, idx) => {
        const isActive = pathname === href;

        return (
          <CustomLink key={href} href={href} passHref>
            <motion.div
              whileTap={{ scale: 1.3 }}
              className={cn(
                "relative mx-auto block tablet:w-10 w-14 cursor-pointer px-[10px] tablet:px-0 py-[12px] tablet:py-[30px] transition-colors duration-300",
                isActive ? "text-link" : "text-foreground",
                idx !== 0 ? "tablet:mt-[30px]" : "",
              )}
              aria-label={label}
            >
              <div className="mx-auto flex h-auto w-[70%] items-center justify-center">
                <Icon className="h-full w-full" />
              </div>
            </motion.div>
          </CustomLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
