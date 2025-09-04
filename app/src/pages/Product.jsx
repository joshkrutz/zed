import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

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

  useEffect(() => {}, []);

  return (
    <>
      {!editing && (
        <div className="flex justify-center flex-col items-center gap-8">
          <div className="flex flex-col select-none justify-center items-start max-w-[500px] gap-4">
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="name" className="font-bold">
                Name:
              </label>
              <h1 id="name">{item.name}</h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="id" className="font-bold">
                ID:
              </label>
              <h2>{item.id}</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="description" className="font-bold">
                Description:
              </label>
              <p>{item.description}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="Quantity" className="font-bold">
                Quantity:
              </label>
              <p>{item.quantity}</p>
            </div>
            <Button
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
              <label htmlFor="name" className="font-bold">
                Name:
              </label>
              <Input
                autoFocus
                className="flex-1"
                id="name"
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
