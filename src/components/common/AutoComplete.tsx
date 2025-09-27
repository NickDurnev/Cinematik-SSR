import {
  AutocompleteProps,
  default as MuiAutocomplete,
} from "@mui/material/Autocomplete";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { Option } from "@/types/general";

const DEFAULT_AUTOCOMPLETE_STYLES = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&.Mui-focused fieldset": {
      borderColor: "var(--foreground)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--primary)",
  },
  "& .MuiFormLabel-root": {
    color: "var(--foreground)",
  },
  "& .MuiFormLabel-root:.Mui-focused": {
    color: "var(--foreground)",
  },
  "& .MuiAutocomplete-groupUlt": {
    color: "var(--foreground)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--foreground)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--foreground)",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "var(--foreground)",
    padding: "8.5px",
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "var(--foreground)",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "var(--foreground)",
  },
  "& .MuiSvgIcon-root": {
    color: "var(--foreground)",
  },
  "& .MuiChip-root": {
    backgroundColor: "transparent",
    border: "1px solid var(--foreground)",
    color: "var(--foreground)",
  },
};

type Props = Omit<
  AutocompleteProps<Option, true, true, false>,
  "renderInput" | "onChange" | "multiple" | "value"
> & {
  options: Option[];
  label: string;
  placeholder: string;
  onChange: (value: Option[] | Option) => void;
  value?: Option[] | Option;
  multiple?: boolean;
  limitTags?: number;
  fullWidth?: boolean;
};

export const Autocomplete = ({
  options,
  label,
  placeholder,
  onChange,
  multiple = true,
  limitTags = 3,
  fullWidth = true,
  value,
  sx,
}: Props) => {
  const mergedSx = [
    DEFAULT_AUTOCOMPLETE_STYLES,
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ] as unknown as SxProps<Theme>;

  return (
    <div className="py-3">
      <MuiAutocomplete
        multiple={multiple}
        limitTags={limitTags}
        options={options}
        renderInput={params => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
        fullWidth={fullWidth}
        sx={mergedSx}
        freeSolo={false}
        value={value}
        onChange={(_, value) => {
          if (multiple) {
            onChange(value as Option[]);
          } else {
            onChange(value as Option);
          }
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--background)", // dropdown background
              color: "var(--foreground)", // text color
            },
          },
          popper: {
            sx: {
              "& .MuiAutocomplete-option": {
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                "&[aria-selected='true']": {
                  backgroundColor: "var(--primary)", // selected item
                  color: "var(--background)", // selected text
                },
                "&[aria-selected='true'].Mui-focused": {
                  backgroundColor: "var(--primary)",
                },
                "&.Mui-focused": {
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                },
              },
              "& .MuiAutocomplete-noOptions": {
                color: "var(--foreground)",
                px: 2,
                py: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};
