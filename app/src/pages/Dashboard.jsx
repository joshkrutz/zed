import { useEffect } from "react";
import { Gallery } from "../components/Gallery";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";
import { Toolbar } from "../components/Toolbar";
import useSWR from "swr";
import { Navigate, useNavigate } from "react-router-dom";

const items2 = [
  {
    name: "Test",
    description: "Test description",
    quantity: 10,
    id: "1234-1234",
  },
  {
    name: "Test2",
    description: "Test2 description",
    quantity: 11,
    id: "1234-12334",
  },
];

// const items = []

export function Dashboard() {
  const { authUser } = useAuth();
  const [items, setItems] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/");
      return;
    }

    try {
      fetch("/api/products/me")
        .then((res) => res.json())
        .then((dat) => {
          setItems(dat);
          return dat;
        });
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [authUser]);

  return (
    <>
      <Toolbar className="mt-2" />
      <div className="flex flex-col w-full h-fit items-center justify-center p-4">
        {authUser && (
          <h2 className="text-lg w-full text-left select-none pl-8">
            Hello {authUser.first_name}!
          </h2>
        )}
        <Gallery data={items} />
      </div>
    </>
  );
}
