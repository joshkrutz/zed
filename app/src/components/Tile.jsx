import { Link } from "react-router-dom";

export function Tile({ data }) {
  return (
    <Link to={`/product/${data.id}`}>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>{data.quantity}</p>
      <p>{data.id}</p>
    </Link>
  );
}
