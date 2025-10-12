"use client";

import DevicesIcon from "@mui/icons-material/Devices";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslations } from "next-intl";

import { Button, CustomLink, Show } from "@/components/common";
import { UserStore, useUserStore, useUserStoreHydrated } from "@/hooks/stores";
import useLogout from "@/hooks/useLogout";

export const AppLink = () => {
  const user = useUserStore((state: UserStore) => state.user);
  const hydrated = useUserStoreHydrated();
  const t = useTranslations("landing");

  const { handleLogout } = useLogout();

  if (!hydrated) {
    return null;
  }

  return (
    <div className="laptopM:m-0 mx-auto tablet:mx-auto tablet:my-[100px] laptopL:mb-[120px] laptopM:mb-[20px] tablet:mb-0 w-[350px] bg-transparent">
      <Show
        when={user.id}
        fallback={
          <div className="flex items-center laptop:justify-start justify-center">
            <CustomLink href="/login" passHref>
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
                {t("auth.login")}
              </Button>
            </CustomLink>
          </div>
        }
      >
        <div>
          <h3 className="color-foreground mb-[30px] font-normal text-[35px] leading-[40px] tracking-[0.05em]">
            {t("home.welcome")} <br />
            {user.name}
          </h3>
          <div className="flex w-full justify-between gap-x-5">
            <Button
              onClick={handleLogout}
              endIcon={<LogoutIcon />}
              variant="outlined"
            >
              {t("auth.logout")}
            </Button>
            <CustomLink href="/app/home" passHref>
              <Button endIcon={<DevicesIcon />} variant="outlined">
                {t("home.goToApp")}
              </Button>
            </CustomLink>
          </div>
        </div>
      </Show>
    </div>
  );
};
