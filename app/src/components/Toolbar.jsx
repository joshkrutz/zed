import { Plus } from "lucide-react";
import Button from "./Button";
import { SearchBar } from "./SearchBar";
import { useAuth } from "./AuthProvider";

export function Toolbar({ className, ...props }) {
  const { authUser } = useAuth();
  return (
    <div className={`flex justify-center gap-4 items-center  ${className}`}>
      <SearchBar />
      {authUser && (
        <Button className={`flex`}>
          <Plus /> Add Item
        </Button>
      )}
    </div>
  );
}
