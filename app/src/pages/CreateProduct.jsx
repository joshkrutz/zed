import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export function CreateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate("/");
  }, [authUser]);

  return (
    <div className="flex justify-center flex-col items-center gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/api/products/", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
              quantity: quantity,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(() => {
            navigate("/dashboard");
          });
        }}
        className="flex flex-col select-none justify-center items-start max-w-[500px] gap-4"
      >
        <div className="flex gap-2 flex-wrap items-center w-full">
          <label htmlFor="product_name" className="font-bold">
            Name:
          </label>
          <Input
            autoFocus
            className="flex-1"
            id="product_name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center w-full">
          <label htmlFor="description" className="font-bold">
            Description:
          </label>
          <Input
          variant="textarea"
            className="w-full"
            id="description"
            type="mu"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center w-full">
          <label htmlFor="quantity" className="font-bold">
            Quantity:
          </label>
          <Input
            className="flex-1"
            id="quantity"
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            value={quantity}
          />
        </div>
        <div className="w-full flex justify-evenly">
          <Link to="/dashboard">
            <Button
              type={"ghost"}
              onClick={() => {
                setEditing((prev) => false);
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
