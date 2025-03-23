import React from "react";
import Navbar from "../navbar";
import { useRouter } from "next/router";

type AppShellProps = {
  children: React.ReactNode;
};

const disableNavbarPaths = ["/auth/login", "/auth/register", "/404"];

function AppShell(props: AppShellProps) {
  const { pathname } = useRouter();

  const { children } = props;
  return (
    <div
      className={`${!disableNavbarPaths.includes(pathname) && "pb-40"} px-5 lg:px-16 xl:px-24 2xl:px-64`}
    >
      {!disableNavbarPaths.includes(pathname) && <Navbar />}
      {children}
    </div>
  );
}

export default AppShell;
