"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/tailwind-merge";
import HomeIcon from "@/public/icons/Home.svg";
import MovieIcon from "@/public/icons/Movie.svg";
import StarIcon from "@/public/icons/Star.svg";
import TelIcon from "@/public/icons/Telev.svg";

import { CustomLink } from "../common";

const navItems = [
  { href: "/app/home", icon: HomeIcon, label: "Home" },
  { href: "/movies", icon: MovieIcon, label: "Movies" },
  { href: "/favorites", icon: StarIcon, label: "Favorites" },
  { href: "/watched", icon: TelIcon, label: "Watched" },
];

const Navigation = () => {
  const pathname = usePathname();
  console.log("🚀 ~ pathname:", pathname);
  return (
    <nav className="mt-10 tablet:mt-[125px] flex flex-col items-center">
      {navItems.map(({ href, icon: Icon, label }, idx) => {
        const isActive = pathname === href;
        console.log("🚀 ~ isActive:", isActive);

        return (
          <CustomLink key={href} href={href} passHref>
            <motion.div
              whileTap={{ scale: 1.3 }}
              className={cn(
                "relative mx-auto block w-10 cursor-pointer py-[30px] transition-colors duration-300",
                isActive ? "text-link" : "text-foreground",
                idx !== 0 ? "mt-[30px]" : "",
              )}
              aria-label={label}
            >
              <Icon className="mx-auto h-auto w-[70%]" />
            </motion.div>
          </CustomLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
