import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../components/AuthProvider";
import useSWR from "swr";

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
  const [isAuthorizedToEdit, setIsAuthorized] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigator = useNavigate();

  const {
    data: item,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/products/${item_id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    setIsAuthorized(item && authUser && authUser.id === item.manager_id);

    if (!isLoading) {
      setTitle(item.title);
      setDescription(item.description);
      setQuantity(item.quantity);
    }

    setEditing(false);
  }, [authUser, isLoading]);

  if (isLoading) return <>Loading...</>;

  if (error) return <>{error.message}</>;

  return (
    <>
      {!editing && (
        <div className="flex justify-center flex-col items-center gap-8">
          <div className="flex flex-col select-none justify-center items-start max-w-[500px] gap-4">
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">Name:</p>
              <p id="name">{item.title}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">ID:</p>
              <p>{item.id}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">Description:</p>
              <p className="break-all">{item.description}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="font-bold">Quantity:</p>
              <p>{item.quantity}</p>
            </div>
            <div className="flex w-full gap-2">
              <Button
                disabled={!authUser || !isAuthorizedToEdit}
                type="destructive"
                className="flex-1"
                onClick={() => {
                  fetch(`/api/products/${item_id}`, {
                    method: "DELETE",
                    credentials: "include",
                  }).then(() => navigator("/dashboard"));
                }}
              >
                Delete
              </Button>
              <Button
                disabled={!authUser || !isAuthorizedToEdit}
                className="flex-1"
                onClick={() => {
                  setEditing((prev) => true);
                }}
              >
                Edit
              </Button>
            </div>
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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
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
                variant="textarea"
                className="w-full"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
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
              <Button
                onClick={() => {
                  fetch(`/api/products/${item_id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                      title: title,
                      description: description,
                      quantity: quantity,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(() => {
                    setEditing(false);
                    mutate(`/api/products/${item_id}`);
                  });
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
