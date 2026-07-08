import mongoose from "mongoose"


const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique : true,
    },
    productName: {
      type: String,
      required: [true, "add a product name"],
    },
    price: {
      type: Number,
      required: [true, "add a product price"],
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);



const Product = mongoose.model("Product", productSchema);
export default Product;