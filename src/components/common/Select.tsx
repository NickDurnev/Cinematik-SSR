import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import type { FormControlProps } from "@mui/material/FormControl";
import MuiSelect, {
  type SelectProps as MuiSelectProps,
} from "@mui/material/Select";
import * as React from "react";

import { Option } from "@/types/general";

const DEFAULT_SELECT_STYLES = {
  "&.MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--primary)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--foreground)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--foreground)",
  },
  "& .MuiSelect-select": {
    color: "var(--foreground)",
    padding: "8.5px",
  },
  "& .MuiSelect-icon": {
    color: "var(--foreground)",
  },
  "& .MuiSelect-iconOpen": {
    color: "var(--foreground)",
  },
};

export type SelectProps = Omit<
  MuiSelectProps<string | number>,
  "children" | "label"
> & {
  label?: string;
  options?: Option[];
  formControlProps?: FormControlProps;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

export const Select = ({
  sx,
  children,
  options,
  label,
  id,
  labelId,
  fullWidth = true,
  formControlProps,
  ...props
}: SelectProps) => {
  const generatedId = React.useId();
  const resolvedLabelId = label
    ? (labelId ?? `${generatedId}-label`)
    : undefined;
  const resolvedId = id ?? `${generatedId}-select`;

  return (
    <div className="interactive relative">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth={fullWidth} {...formControlProps}>
          {label ? (
            <InputLabel
              sx={{
                color: "var(--foreground)",
                "&.Mui-focused": { color: "var(--foreground)" },
              }}
              id={resolvedLabelId}
            >
              {label}
            </InputLabel>
          ) : null}
          <MuiSelect
            id={resolvedId}
            labelId={resolvedLabelId}
            label={label}
            {...props}
            sx={[
              DEFAULT_SELECT_STYLES,
              ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
          >
            {options?.map(opt => (
              <MenuItem
                key={String(opt.value)}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </MenuItem>
            ))}
            {children}
          </MuiSelect>
        </FormControl>
      </Box>
    </div>
  );
};
