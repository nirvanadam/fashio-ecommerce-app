import React from "react";
import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
};

function AppShell(props: AppShellProps) {
  const { children } = props;
  return (
    <div className="px-5 pb-40 lg:px-16 xl:px-24 2xl:px-64">
      <Navbar />
      {children}
    </div>
  );
}

export default AppShell;
