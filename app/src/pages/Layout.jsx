import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";

export function Layout() {
  const { theme, toggleTheme } = useAuth();

  return (
    <div className="bg-background-light w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
}
