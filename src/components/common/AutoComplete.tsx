import {
  AutocompleteProps,
  default as MuiAutocomplete,
} from "@mui/material/Autocomplete";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { Option } from "@/types/general";

const DEFAULT_AUTOCOMPLETE_STYLES: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "transparent", // transparent background fix
    color: "var(--foreground)",
    "& fieldset": {
      borderColor: "var(--primary)",
      transition: "border-color 0.2s ease, background-color 0.2s ease",
    },
    "&:hover fieldset": {
      borderColor: "var(--foreground)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--foreground)",
      borderWidth: "2px",
    },
    "& input": {
      color: "var(--foreground)",
    },
  },

  // Fix multiple mode (adds specificity)
  "&& .MuiAutocomplete-inputRoot.MuiOutlinedInput-root:hover fieldset": {
    borderColor: "var(--foreground)",
  },
  "&& .MuiAutocomplete-inputRoot.MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "var(--foreground)",
    borderWidth: "2px",
  },

  // Label
  "& .MuiFormLabel-root": {
    color: "var(--foreground)",
    "&.Mui-focused": {
      color: "var(--foreground)",
    },
  },

  // Placeholder
  "& .MuiInputBase-input::placeholder": {
    color: "var(--foreground)",
    opacity: 0.6,
  },

  // Chips (multiple mode)
  "& .MuiChip-root": {
    backgroundColor: "transparent",
    border: "1px solid var(--foreground)",
    color: "var(--foreground)",
    "& .MuiChip-deleteIcon": {
      color: "var(--foreground)",
      "&:hover": {
        color: "var(--primary)",
      },
    },
  },

  // Icons (popup, clear, etc.)
  "& .MuiAutocomplete-popupIndicator": {
    color: "var(--foreground)",
    "&:hover": {
      color: "var(--primary)",
    },
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "var(--foreground)",
    "&:hover": {
      color: "var(--primary)",
    },
  },
  "& .MuiSvgIcon-root": {
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
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            },
          },
          popper: {
            sx: {
              "& .MuiAutocomplete-option": {
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                transition: "background-color 0.15s ease, color 0.15s ease",
                "&:hover": {
                  backgroundColor: "var(--secondary)", // 👈 new hover color
                  color: "var(--background)",
                },
                "&[aria-selected='true']": {
                  backgroundColor: "var(--primary)",
                  color: "var(--background)",
                },
                "&[aria-selected='true'].Mui-focused": {
                  backgroundColor: "var(--primary)",
                },
                "&.Mui-focused": {
                  backgroundColor: "var(--secondary)",
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
