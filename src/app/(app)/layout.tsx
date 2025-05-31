import React from "react";
import { ToastContainer } from "react-toastify";

//#Services
import theme from "@/services/theme";

//#Components
import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@mui/material/styles";

//#Styles
import styled from "@emotion/styled";

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    color: var(--mainTextColor);
    background-color: var(--mainBgColor);
    & > button {
      color: var(--mainTextColor);
    }
  }
`;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {children}
        <StyledToastContainer
          autoClose={3000}
          position={"top-center"}
          limit={1}
        />
      </Layout>
    </ThemeProvider>
  );
};

export default AppLayout;
