"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Cast } from "@/components/app/Cast";
import ReviewList from "@/components/app/ReviewList";
import { SimilarTVShows } from "@/components/app/tv-shows/SimilarTVShows";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const DEFAULT_TAB_STYLES = {
  fontSize: "1.5rem",
  fontWeight: "semibold",
  width: "25%",
  color: "var(--foreground)",
  "&:hover": {
    color: "var(--primary)",
  },
  "&.Mui-selected": {
    color: "var(--primary)",
  },
  "&.Mui-selected:hover": {
    color: "var(--primary)",
  },
  "&.Mui-selected:focus-within:focus-within:focus-within:hover": {
    color: "var(--primary)",
  },
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TVShowTabsProps {
  tvShowId: string;
}

export const TVShowTabs = ({ tvShowId }: TVShowTabsProps) => {
  const t = useTranslations("app.tvShowInfo.tabs");
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "var(--primary)",
          color: "var(--foreground)",
          indicatorColor: "var(--primary)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tv show info tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--primary)",
            },
          }}
          centered
        >
          <Tab
            label={t("cast")}
            sx={{
              ...DEFAULT_TAB_STYLES,
            }}
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              ...DEFAULT_TAB_STYLES,
            }}
            label={t("reviews")}
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              ...DEFAULT_TAB_STYLES,
            }}
            label={t("similarTVShows")}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Cast movieId={tvShowId} isTVShow />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ReviewList movieId={tvShowId} isTVShow />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SimilarTVShows tvShowId={tvShowId} />
      </CustomTabPanel>
    </Box>
  );
};
