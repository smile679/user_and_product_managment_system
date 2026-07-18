import { Button } from "@base-ui/react";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 bg-red-500 w-full min-h-screen">
      <div className="w-full h-18 flex justify-end p-4">
        <Button className="bg-blue-500 text-white py-1 px-2 rounded">Add Product</Button>
      </div>

    </div>
  )
}

export default Dashboard;