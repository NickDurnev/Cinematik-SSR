import Link from "next/link";

import { Button, LoginButton, Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";

const AppLink = () => {
  const user = useUserStore((state: UserStore) => state.user);

  return (
    <div className="laptopM:m-0 mx-auto tablet:mx-auto tablet:my-[100px] laptopL:mb-[120px] laptopM:mb-[20px] tablet:mb-0 w-[350px] bg-transparent">
      <Show when={user._id} fallback={<LoginButton />}>
        <div>
          <h3 className="color-foreground mb-[30px] font-normal text-[35px] leading-[40px] tracking-[0.05em]">
            Welcome <br />
            {user.name}
          </h3>
          <div className="flex w-full justify-between gap-x-5">
            <Link href="/api/auth/logout" passHref>
              <Button variant="text" className="px-[30px] py-[25px]">
                Logout
              </Button>
            </Link>
            <Link href="/api/auth/logout" passHref>
              <Button variant="text" className="px-[30px] py-[25px]">
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
