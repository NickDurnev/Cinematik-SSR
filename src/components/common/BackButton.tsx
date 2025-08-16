"use client";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { Button, CustomLink } from "../common";

interface BackButtonProps {
  onBackClick?: () => void;
  url?: string;
  backupUrl?: string;
  children?: React.ReactNode;
}

export const BackButton: FC<BackButtonProps> = ({
  children,
  onBackClick,
  url,
  backupUrl,
}) => {
  const router = useRouter();
  const [previousUrl, setPreviousUrl] = useState<string>("");

  useEffect(() => {
    setPreviousUrl(document.referrer);
  }, []);

  const previousUrlWithoutParams = previousUrl.split("?")[0];
  const handleBackClick = () => {
    if (previousUrl.split("?")[1]) {
      router.push(previousUrlWithoutParams);
    } else {
      if (backupUrl) {
        router.push(backupUrl);
      }
      router.back();
    }
  };

  if (url) {
    return (
      <CustomLink passHref href={url}>
        <Button customVariant="ghost">
          {children ?? <KeyboardBackspaceIcon sx={{ width: 50, height: 50 }} />}
        </Button>
      </CustomLink>
    );
  }

  return (
    <Button
      customVariant="ghost"
      onClick={onBackClick ? onBackClick : handleBackClick}
    >
      {children ?? <KeyboardBackspaceIcon sx={{ width: 50, height: 50 }} />}
    </Button>
  );
};
