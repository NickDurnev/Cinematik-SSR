import React from "react";

interface ShowProps<T> {
  when: T | undefined | null | false;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export const Show = <T,>({
  when,
  fallback = null,
  children,
}: ShowProps<T>): React.ReactElement | null => {
  if (!when) {
    return fallback as React.ReactElement | null;
  }
  return (
    typeof children === "function" ? children(when) : children
  ) as React.ReactElement;
};
