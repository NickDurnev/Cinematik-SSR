"use client";

import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";

const StyledToastContainer = styled(ToastContainer)`
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

export default function ToastProvider() {
  return (
    <StyledToastContainer autoClose={3000} position="top-center" limit={1} />
  );
}
