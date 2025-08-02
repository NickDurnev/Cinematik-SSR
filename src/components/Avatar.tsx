"use client";

import { Avatar as MuiAvatar } from "@mui/material";
import Image from "next/image";

import { IUser } from "@/types/user";
//#Services
import { stringAvatar } from "@/utils/general";

interface IProps {
  picture?: IUser["picture"];
  name: IUser["name"];
  size: number;
}

const Avatar = ({ picture, name, size }: IProps) => {
  return (
    <>
      {picture ? (
        <Image
          src={picture}
          alt="Avatar"
          width={size}
          height={size}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <MuiAvatar
          {...stringAvatar(`${name}`)}
          sx={{
            width: size,
            height: size,
            fontSize: 25,
            lineHeight: "25px",
            letterSpacing: "0.05em",
            backgroundColor: "#00000000",
            color: "#fff",
            border: "1px solid #fff",
          }}
        />
      )}
    </>
  );
};

export default Avatar;
