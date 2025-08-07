import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "/icons/Home.svg";
import MovieIcon from "/icons/Movie.svg";
import StarIcon from "/icons/Star.svg";
import TelIcon from "/icons/Telev.svg";

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
          <Link key={href} href={href} passHref>
            <motion.a
              whileTap={{ scale: 1.3 }}
              href={href}
              className={[
                "relative mx-auto block w-10 cursor-pointer py-[30px] transition-colors duration-300",
                isActive
                  ? "text-[var(--bg-element-color)]"
                  : "text-[var(--text-color)]",
                idx !== 0 ? "mt-[30px]" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label={label}
              style={{
                color: isActive
                  ? "var(--bg-element-color, #d89edb)"
                  : "var(--text-color, #141414)",
              }}
            >
              <Icon className="mx-auto h-auto w-[70%] stroke-current" />
            </motion.a>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
