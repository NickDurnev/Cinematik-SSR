"use client";

import { Avatar as MuiAvatar } from "@mui/material";
import Image from "next/image";

import useSizeScreen from "@/hooks/useSizeScreen";
import { ScreenType } from "@/types/general";
import { IUser } from "@/types/user";
import { stringAvatar } from "@/utils/general";

interface IProps {
  picture?: IUser["picture"];
  name: IUser["name"];
  size?: number;
}

export const Avatar = ({ picture, name, size }: IProps) => {
  const screenSize = useSizeScreen();
  const isPhone = screenSize === ScreenType.PHONE;
  const finalSize = isPhone ? 30 : (size ?? 60);
  return (
    <>
      {picture ? (
        <Image
          src={picture}
          alt="Avatar"
          width={finalSize}
          height={finalSize}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <MuiAvatar
          {...stringAvatar(`${name}`)}
          sx={{
            width: finalSize,
            height: finalSize,
            fontSize: isPhone ? 16 : 25,
            paddingTop: isPhone ? "3px" : "5px",
            letterSpacing: "0.05em",
            backgroundColor: "#00000000",
            color: "var(--foreground)",
            border: "1px solid var(--foreground)",
          }}
        />
      )}
    </>
  );
};
