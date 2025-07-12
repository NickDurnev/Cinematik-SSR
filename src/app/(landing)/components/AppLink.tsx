import DevicesIcon from "@mui/icons-material/Devices";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

import { Button, Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";

const AppLink = () => {
  const user = useUserStore((state: UserStore) => state.user);
  console.log("🚀 ~ AppLink ~ user:", user);

  return (
    <div className="laptopM:m-0 mx-auto tablet:mx-auto tablet:my-[100px] laptopL:mb-[120px] laptopM:mb-[20px] tablet:mb-0 w-[350px] bg-transparent">
      <Show
        when={user.id}
        fallback={
          <div className="flex items-center laptop:justify-start justify-center">
            <Link href="/login" passHref>
              <Button
                endIcon={<LoginIcon sx={{ width: 25, height: 25 }} />}
                variant="outlined"
                sx={{
                  paddingX: 6,
                  paddingY: 2,
                  fontSize: 20,
                  textTransform: "uppercase",
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        }
      >
        <div>
          <h3 className="color-foreground mb-[30px] font-normal text-[35px] leading-[40px] tracking-[0.05em]">
            Welcome <br />
            {user.name}
          </h3>
          <div className="flex w-full justify-between gap-x-5">
            <Link href="/api/auth/logout" passHref>
              <Button endIcon={<LogoutIcon />} variant="outlined">
                Logout
              </Button>
            </Link>
            <Link href="/api/auth/logout" passHref>
              <Button endIcon={<DevicesIcon />} variant="outlined">
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
