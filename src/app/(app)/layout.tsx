import React from "react";

//#Components
import Layout from "@/components/Layout/Layout";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default AppLayout;
