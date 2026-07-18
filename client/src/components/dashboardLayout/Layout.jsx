import { Button } from "@base-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex">
      <aside className="w-64 min-h-screen bg-blue-500">
        <div className="p-4 border-b-2 border-blue-200">
          <h1 className="text-xl font-bold">Web Management</h1>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Button
            className="text-lg font-bold p-2 text-white hover:opacity-75 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Dashboard
          </Button>
          <Button
            className="text-lg font-bold p-2 text-white hover:opacity-75 cursor-pointer"
            onClick={() => navigate("/dashboard/products")}
          >
            Products
          </Button>
          <Button
            className="text-lg font-bold p-2 text-white hover:opacity-75 cursor-pointer"
            onClick={() => navigate("/dashboard/transactions")}
          >
            Transactions
          </Button>
          <Button
            className="text-lg font-bold p-2 text-white hover:opacity-75 cursor-pointer"
            onClick={() => navigate("/dashboard/users")}
          >
            Users
          </Button>
        </div>
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </section>
  );
}

export default DashboardLayout;