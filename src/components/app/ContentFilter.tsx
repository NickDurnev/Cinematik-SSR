import TuneIcon from "@mui/icons-material/Tune";
import React, { useState } from "react";

import { Button, Drawer } from "../common";

type Props = {
  isPhone: boolean;
  setIsDropMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Filter = ({ isPhone, setIsDropMenuOpen }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Button
        isIconButton={true}
        aria-label="content-filters"
        onClick={
          isPhone
            ? () => setIsDrawerOpen(true)
            : () => setIsDropMenuOpen(prev => !prev)
        }
      >
        <TuneIcon fontSize={isPhone ? "medium" : "large"} />
      </Button>

      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "var(--secondary)",
          color: "var(--foreground)",
        }}
      >
        <div>Filters</div>
      </Drawer>
    </>
  );
};
