"use client";

import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC } from "react";

import { Link } from "../../i18n/navigation";

type ICustomLink = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    locale?: string;
  };

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
