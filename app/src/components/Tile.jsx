import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

export function Tile({ data }) {
  return (
    <div className="bg-white w-[350px] h-[150px] rounded-3xl drop-shadow-xl flex flex-col justify-center p-6 z-0">
      <div className="flex">
        <Link className="flex-1" to={`/product/${data.id}`}>
          <h1 className="text-lg flex-1">
            <span className="font-bold">{data.title}</span>
            {` (x${data.quantity})`}
          </h1>
        </Link>
        <button
          type="ghost"
          className="border-foreground-light cursor-pointer border flex justify-center items-center  rounded-lg hover:bg-foreground-light items-center"
          onClick={() => {
            navigator.clipboard.writeText(data.id);
          }}
        >
          <div className="bg-white h-full flex items-center truncate w-[90px] pl-2 pr-2"><p className="w-full truncate" >{data.id}</p></div>
          <div className="h-full flex items-center self-center text-center border-foreground-light border-l pl-2 pr-2 p-1 ">
            <Copy className="h-2/3 " />
          </div>
        </button>
      </div>
      <Link className="flex-1 h-full" to={`/product/${data.id}`}>
        <p className="break-all">
          {data.description.length > 100
            ? data.description.slice(0, 100) + "..."
            : data.description}
        </p>
      </Link>
    </div>
  );
}
