import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "@mui/material/styles" {
  export interface PaletteOptions {
    navColor: { main: string };
    mainTextColor: { main: string };
    accentColor: { main: string };
  }
  export interface Palette {
    navColor: { main: string };
    mainTextColor: { main: string };
    accentColor: { main: string };
  }
}

const theme = createTheme({
  cssVariables: true,
  status: {
    danger: "var(--destructive)",
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-muller)",
    button: {
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "18px",
      textTransform: "none",
      color: "var(--primary)",
    },
  },
  palette: {
    navColor: {
      main: "transparent",
    },
    mainTextColor: {
      main: "var(--foreground)",
    },
    accentColor: {
      main: "var(--primary)",
    },
  },
});

export default theme;
