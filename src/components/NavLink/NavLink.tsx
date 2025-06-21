"use client";
import Link from "next/link";

interface IProps {
  href: string;
  name: string;
  key?: string;
  onClick?: () => void;
  sx?: object;
  className?: string;
}

const NavLink = ({ href, name, className }: IProps) => {
  return (
    <Link
      href={href}
      passHref
      className={`font-normal text-lg text-mainText leading-[18px] ${className}`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
