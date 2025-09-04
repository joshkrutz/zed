import { useEffect } from "react";
import { Gallery } from "../components/Gallery";

const items = [
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

  useEffect(() => {}, []);

  return <Gallery data={items} />;
}
