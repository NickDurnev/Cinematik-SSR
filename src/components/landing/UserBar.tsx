"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { UserStore, useUserStore } from "@/hooks/stores";

import { Avatar, Button, CustomLink, Show } from "../common";

export const UserBar = () => {
  const [isSizeScreen, setIsSizeScreen] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsSizeScreen("tablet");
    }
  }, []);

  const user = useUserStore((state: UserStore) => state.user);
  const t = useTranslations("landing.auth");

  return (
    <div className="ml-[50px]">
      <Show
        when={user.id}
        fallback={
          <CustomLink href="/login" passHref>
            <Button variant="text">{t("login")}</Button>
          </CustomLink>
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
