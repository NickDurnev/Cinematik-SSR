import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/tailwind-merge";

import HomeIcon from "/icons/Home.svg";
import MovieIcon from "/icons/Movie.svg";
import StarIcon from "/icons/Star.svg";
import TelIcon from "/icons/Telev.svg";

import { CustomLink } from "../common";

const navItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/movies", icon: MovieIcon, label: "Movies" },
  { href: "/favorites", icon: StarIcon, label: "Favorites" },
  { href: "/watched", icon: TelIcon, label: "Watched" },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="mt-10 tablet:mt-[125px] flex flex-col items-center">
      {navItems.map(({ href, icon: Icon, label }, idx) => {
        const isActive = pathname === href;
        return (
          <CustomLink key={href} href={href} passHref>
            <motion.a
              whileTap={{ scale: 1.3 }}
              href={href}
              className={cn(
                "relative mx-auto block w-10 cursor-pointer py-[30px] transition-colors duration-300",
                isActive ? "text-bg-element" : "text-foreground",
                idx !== 0 ? "mt-[30px]" : "",
              )}
              aria-label={label}
            >
              <Icon className="mx-auto h-auto w-[70%] stroke-current" />
            </motion.a>
          </CustomLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
