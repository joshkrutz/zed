import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../components/AuthProvider";

const item = {
  name: "Test",
  description: "Test description",
  quantity: 10,
  id: "1234-1234",
};

// const items = []

export function Product() {
  const item_id = useParams().id;
  const [editing, setEditing] = useState(false);
  const { authUser } = useAuth();

  useEffect(() => {
    setEditing(false);
  }, [authUser]);

  return (
    <>
      {!editing && (
        <div className="flex justify-center flex-col items-center gap-8">
          <div className="flex flex-col select-none justify-center items-start max-w-[500px] gap-4">
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">Name:</p>
              <p id="name">{item.name}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">ID:</p>
              <p>{item.id}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">Description:</p>
              <p>{item.description}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">Quantity:</p>
              <p>{item.quantity}</p>
            </div>
            <Button
              disabled={!authUser}
              className="w-full"
              onClick={() => {
                setEditing((prev) => true);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
      {editing && (
        <div className="flex justify-center flex-col items-center gap-8">
          <div className="flex flex-col select-none justify-center items-start max-w-[500px] gap-4">
            <div className="flex gap-2 flex-wrap items-center w-full">
              <label htmlFor="product_name" className="font-bold">
                Name:
              </label>
              <Input
                autoFocus
                className="flex-1"
                id="product_name"
                defaultValue={item.name}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center w-full">
              <label htmlFor="id" className="font-bold">
                ID:
              </label>
              <Input
                className="flex-1"
                disabled
                id="id"
                defaultValue={item.id}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center w-full">
              <label htmlFor="description" className="font-bold">
                Description:
              </label>
              <Input
                className="w-full"
                id="description"
                defaultValue={item.description}
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
                defaultValue={item.quantity}
              />
            </div>
            <div className="w-full flex justify-evenly">
              <Button
                type={"ghost"}
                onClick={() => {
                  setEditing((prev) => false);
                }}
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
