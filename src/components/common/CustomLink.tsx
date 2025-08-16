"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC } from "react";

type ICustomLink = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const CustomLink: FC<ICustomLink> = ({
  href,
  children,
  className = "",
  ...rest
}) => {
  return (
    <Link
      href={href}
      {...rest}
      className={`no-long-press ${className}`}
      onContextMenu={(event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
      }}
    >
      {children}
    </Link>
  );
};
