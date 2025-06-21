import { Button } from "@mui/material";
import Link from "next/link";

import { LoginButton } from "@/app/(app)/components";
import { Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";

const AppLink = () => {
  const user = useUserStore((state: UserStore) => state.user);

  return (
    <div className="laptopM:m-0 mx-auto tablet:mx-auto tablet:my-[100px] laptopL:mb-[120px] laptopM:mb-[20px] tablet:mb-0 w-[350px] bg-transparent">
      <Show when={user._id} fallback={<LoginButton />}>
        <div>
          <h3
            className="mb-[30px] font-normal text-[35px] leading-[40px] tracking-[0.05em]"
            style={{ color: "#fff" }}
          >
            Welcome <br />
            {user.name}
          </h3>
          <div className="flex w-full justify-between">
            <Button
              variant="text"
              href="/api/auth/logout"
              className="rounded-[10px] border border-white px-[30px] py-[25px] font-muller text-[20px] uppercase leading-[20px]"
              sx={{ color: "white" }}
            >
              Logout
            </Button>
            <Link
              href={`https://cinematikapplication.vercel.app/${user._id}`}
              passHref
            >
              <Button
                variant="text"
                className="rounded-[10px] border border-white px-[30px] py-[25px] font-muller text-[20px] uppercase leading-[20px]"
                sx={{ ml: "20px", color: "white" }}
              >
                Go to App
              </Button>
            </Link>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default AppLink;
