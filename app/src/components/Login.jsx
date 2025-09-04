import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export function Login({ isVisible, closeModal }) {
  const [accountStage, setAccountStage] = useState("login");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const { setAuthUser } = useAuth();

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const modalRef = useRef(null);

  const checkValidation = (e) => {
    if (e.target.value.length === 0) {
      e.target.classList.add(
        "ring-4",
        "ring-destructive",
        "border-red-500",
        "focus:border-destructive"
      );
    } else {
      e.target.classList.remove(
        "ring-4",
        "ring-destructive",
        "border-red-500",
        "focus:border-destructive"
      );
    }
  };

  function LoginForm({ swapView }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      // If missing details, fail
      if (!username || !password) {
        let missing = [];

        if (!username) missing = [missing.concat(["username"]).join(", ")];

        if (!password) missing = [missing.concat(["password"]).join(", ")];

        alert(`Cannot log in. You are missing: ${missing}`);
      } else {
        // Try to login
        try {
          let payload = JSON.stringify({
            username: username,
            password: password,
          });

          setIsLoading(true);
          const res = await fetch("/api/sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: payload,
          });

          if (!res.ok) {
            throw new Error("Server error");
          }

          const userDat = await fetch("/api/users/me", {
            method: "GET",
            credentials: "include",
          });

          if (!userDat.ok) throw new Error(userDat.error);

          const json = await userDat.json();
          setAuthUser(json);
          navigate("/dashboard");
          closeModal();
        } catch (err) {
          setError(err.message);
          setAuthUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    return (
      <div className="flex flex-col justify-around gap-2 items-center w-full">
        {error && <p>Invalid Credentials! {error}</p>}
        <form
          className="flex flex-col w-full justify-center items-center gap-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="username"
              id="username"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onBlur={checkValidation}
              onFocus={(e) => {
                e.target.select();
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={checkValidation}
              onFocus={(e) => {
                e.target.select();
              }}
            />
            <a
              className="cursor-pointer bg-white hover:text-accent1-hover text-accent1 rounded-xl text-right"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Forgot Password
            </a>
          </div>
          <div className="mt-8 flex justify-evenly gap-8">
            <button
              className="cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl"
              type="submit"
              disabled={isLoading}
            >
              Log-In
            </button>
            <button
              className="cursor-pointer p-2 pl-8 pr-8 bg-white hover:text-accent1-hover text-accent1 rounded-xl"
              onClick={swapView}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    );
  }

  function CreateAccountForm({ swapView }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!username || !password) {
        let missing = [];

        if (!username) missing = [missing.concat(["username"]).join(", ")];

        if (!password) missing = [missing.concat(["password"]).join(", ")];

        alert(`Cannot log in. You are missing: ${missing}`);
      } else {
        // Try to login
        try {
          let payload = JSON.stringify({
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
          });

          console.log(payload);

          setIsLoading(true);
          setData(
            await fetch("/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }).then((res) => res.json())
          );
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    return (
      <div className="flex flex-col justify-around gap-2 items-center w-full">
        {error && <p>Invalid Credentials!</p>}
        <form
          className="flex flex-col w-full justify-center items-center gap-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username">Username</label>
            <input
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="username"
              id="username"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="first_name">First Name</label>
            <input
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="first_name"
              id="first_name"
              autoComplete="given-name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="last_name"
              id="last_name"
              autoComplete="family-name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="password"
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
              name="confirm-password"
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-8">
            <button
              className="cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl"
              type="submit"
            >
              Submit
            </button>
            <button
              className="cursor-pointer p-2 pl-8 pr-8 bg-white hover:text-accent1-hover text-accent1 rounded-xl"
              onClick={swapView}
            >
              Already have an account? Log in!
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1">
      <div
        ref={modalRef}
        className="bg-white min-w-[500px] h-fit rounded-3xl drop-shadow-[0_0_200px_rgba(0,0,0,1)] flex flex-col justify-center items-center p-6"
      >
        <h1 className="font-bold text-2xl gap-2 mb-6">
          {accountStage === "login" ? "Login" : "Create an Account"}
        </h1>
        {accountStage === "login" && (
          <LoginForm
            swapView={(e) => {
              e.preventDefault();
              setAccountStage("create");
            }}
          />
        )}
        {accountStage !== "login" && (
          <CreateAccountForm
            swapView={(e) => {
              e.preventDefault();
              setAccountStage("login");
            }}
          />
        )}
      </div>
    </div>
  );
}
