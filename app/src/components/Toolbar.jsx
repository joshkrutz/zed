import { Plus } from "lucide-react";
import Button from "./Button";
import { SearchBar } from "./SearchBar";
import { useAuth } from "./AuthProvider";
import { Link, useLocation } from "react-router-dom";

export function Toolbar({ className, ...props }) {
  const { authUser } = useAuth();

  //If on dashboard page, show option to see all products
  //If on all products offer dashboard

  const location = useLocation();
  const currentPath = location.pathname;

  const onDashboard = currentPath.includes("dashboard");

  return (
    <div className={`flex justify-center gap-4 items-center  ${className}`}>
      {authUser && (
        <>
          {!onDashboard && (
            <Link to="/dashboard">
              <Button type="ghost" className={`flex`}>
                See My Products
              </Button>
            </Link>
          )}
          {onDashboard && (
            <Link to="/">
              <Button type="ghost" className={`flex`}>
                See All Products
              </Button>
            </Link>
          )}
        </>
      )}
      <SearchBar />
      {authUser && (
        <Link to="/product">
          <Button className={`flex`}>
            <Plus /> Add Item
          </Button>
        </Link>
      )}
    </div>
  );
}
