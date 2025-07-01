"use client";
import { useEffect, useState } from "react";
import { Avatar, LoginButton, Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";

const UserBar = () => {
  const [isSizeScreen, setIsSizeScreen] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsSizeScreen("tablet");
    }
  }, []);

  const user = useUserStore((state: UserStore) => state.user);

  return (
    <div className="ml-[50px]">
      <Show when={user._id} fallback={<LoginButton />}>
        <div>
          <Show when={isSizeScreen}>
            <Avatar name={user?.name} size={60} />
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default UserBar;
