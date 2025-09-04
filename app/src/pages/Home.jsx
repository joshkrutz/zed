import { useEffect } from "react";
import { Gallery } from "../components/Gallery";
import { useAuth } from "../components/AuthProvider";
import { useState } from "react";
import { Toolbar } from "../components/Toolbar";

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

export function Home() {
  const { authUser } = useAuth();
  const [items, setItems] = useState();

  useEffect(() => {
    // Fetch users products if logged in
    if (authUser) {
      setItems(items2);
    } else {
      // Fetch all products
      setItems([
        {
          name: "Test23",
          description: "Test2 description",
          quantity: 11,
          id: "1234-12334",
        },
      ]);
    }
  }, [authUser]);

  return (
    <>
      <Toolbar className="mt-2" />
      <div className="flex flex-col max-w-[1000px] m-auto h-fit items-center">
        {authUser && (
          <h2 className="text-lg w-full text-left select-none">
            Hi, {authUser.first_name}
          </h2>
        )}
        <Gallery data={items} />
      </div>
    </>
  );
}
