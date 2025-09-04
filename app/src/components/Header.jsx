import { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export function Header() {
  const [showLoginModal, setLoginModal] = useState(false);

  const { authUser, setAuthUser } = useAuth();

  return (
    <div className="h-fit">
      <div className="flex justify-between items-center p-2 pl-4 pr-4 border-b-2 border-foreground-light">
        <Link to="/">
          <h1 className="text-2xl font-bold">Company Name</h1>
        </Link>
        {!authUser && (
          <button
            className="cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl"
            onClick={() => {
              setLoginModal(true);
            }}
          >
            Login
          </button>
        )}
        {authUser && (
          <button
            className="cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl"
            onClick={async () => {
              try {
                await fetch("/api/sessions", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }).then((res) => {
                  if (res.ok) {
                    setAuthUser(null);
                    setLoggedIn(false);
                  }
                });
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            Logout
          </button>
        )}
      </div>
      {showLoginModal && (
        <Login
          isVisible={showLoginModal}
          closeModal={() => {
            setLoginModal(false);
          }}
        />
      )}
    </div>
  );
}
