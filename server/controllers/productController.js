import Product from "../models/products.js";
import Transaction from "../models/transaction.js";


export const createProduct = async(req, res) => {

  try {
     const { sku, productName, price, quantity } = req.body;

     if (!sku || !productName || !price || !quantity) {
       return res.status(400).json({
         success: false,
         message: "please insert all criterias.",
       });
     }

     const product = await Product.findOne({ sku });
     if (product) {
       return res.status(400).json({
         success: false,
         message: "Product with this SKU already exists.",
       });
     }

     if (quantity < 0) {
       return res.status(400).json({
         success: false,
         message: "Quantity cannot be less than zero.",
       });
     }

    const createdProduct = await Product.create({
       sku,
       productName,
       price,
       quantity,
     });

     res.status(201).json({
       success: true,
       message: "product successfully created! ",
       data: createdProduct,
     });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something error!",
    });
  }
}

export const getProduct = async(req, res) => {

  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "add products to show them here!",
        data: products,
      });
    }

    return res.status(200).json({
      success: true,
      message: "all products successfully fetched!",
      data: products,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
         success: false,
         message: "something is wrong!",
       });
  }
}

export const updateProduct = async (req, res) => {

  try {
    const { productId } = req.params;
    const { 
      amount,
      type,
    } = req.body;

    if(!productId){
      return res.status(404).json({
        success: false,
        message: "productId not provided!",
      });
    }

    if (!type || !amount) {
      return res.status(400).json({
        success: false,
        message: "type and amount are required.",
      });
    }

    if (!["increase", "decrease"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "type must be increase or decrease.",
      });
    }

    const product = await Product.findById(productId);
    if (!product){
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }

   const newQuantity =
     type === "increase"
       ? product.quantity + Number(amount)
       : product.quantity - Number(amount);

      if (newQuantity < 0) {
        return res.status(400).json({
          success: false,
          message: "Stock cannot go below zero.",
        });
      }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { quantity: newQuantity },
      { new: true },
    );

    await Transaction.create({
      productId: product._id,
      type,
      amount,
      quantityBefore: product.quantity,
      quantityAfter: newQuantity,
    });

    return res.status(200).json({
      success: true,
      message: "product successfully updated!",
      data: updatedProduct,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something is wrong!",
    });
  }
}

