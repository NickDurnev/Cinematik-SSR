"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { UserStore, useUserStore } from "@/hooks/stores";

import { Avatar } from "../common/Avatar";
import { Button } from "../common/Button";
import { Show } from "../common/Show";

export const UserBar = () => {
  const [isSizeScreen, setIsSizeScreen] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsSizeScreen("tablet");
    }
  }, []);

  const user = useUserStore((state: UserStore) => state.user);

  return (
    <div className="ml-[50px]">
      <Show
        when={user.id}
        fallback={
          <Link href="/login" passHref>
            <Button variant="text">Login</Button>
          </Link>
        }
      >
        <div>
          <Show when={isSizeScreen}>
            <Avatar name={user?.name} size={60} />
          </Show>
        </div>
      </Show>
    </div>
  );
};
