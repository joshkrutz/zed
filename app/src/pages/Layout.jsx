import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import { useState } from "react";
import { useEffect } from "react";

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const updateUser = async () => {
    try {
      const payload = await fetch("/api/users/me", {
        method: "GET",
        credentials: "include",
      });

      if (!payload.ok) throw new Error(payload.error);

      const json = await payload.json();
      setUser(json);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    // Update user details on login
    updateUser();
  }, [loggedIn]);

  return (
    <div className="bg-background-light">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet />
    </div>
  );
}
