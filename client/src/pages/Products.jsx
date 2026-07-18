import { useEffect } from "react";
import { getProducts } from "../api/products";

const Products = () => {
  useEffect(() => {
    console.log(getProducts());
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      <h1>Products</h1>
    </div>
  )
}

export default Products;