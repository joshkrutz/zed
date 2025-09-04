import { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { useEffect } from "react";

export function Header({ loggedIn, setLoggedIn }) {
  const [showLoginModal, setLoginModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center m-2 ml-4 mr-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">Company Name</h1>
        </Link>
        {!loggedIn && (
          <button
            className="cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl"
            onClick={() => {
              setLoginModal(true);
            }}
          >
            Login
          </button>
        )}
        {loggedIn && (
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
          setLoggedIn={setLoggedIn}
        />
      )}
    </>
  );
}
