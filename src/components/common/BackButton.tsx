"use client";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { Button } from "@/components";

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
      <Link passHref href={url}>
        <Button customVariant="ghost">
          {children ?? <KeyboardBackspaceIcon sx={{ width: 50, height: 50 }} />}
        </Button>
      </Link>
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
