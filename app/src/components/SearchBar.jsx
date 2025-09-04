import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex gap-2 w-fit h-full rounded-lg p-2 bg-foreground-light">
      <Search />
      <input
        className="focus:outline-none focus:border-none border-none"
        placeholder="Search"
        onFocus={(e) => {
          e.target.select();
        }}
      />
    </div>
  );
}
