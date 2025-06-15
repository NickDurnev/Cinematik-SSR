"use client";
import { useEffect, useState } from "react";

import { Avatar, Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";

import { LoginButton } from "@/app/(app)/components";
import { Container } from "./UserBar.styled";

const UserBar = () => {
  const [isSizeScreen, setIsSizeScreen] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsSizeScreen("tablet");
    }
  }, []);

  const user = useUserStore((state: UserStore) => state.user);

  return (
    <Container>
      <Show when={user._id} fallback={<LoginButton />}>
        <div>
          <Show when={isSizeScreen}>
            <Avatar name={user?.name} size={60} />
          </Show>
        </div>
      </Show>
    </Container>
  );
};

export default UserBar;
