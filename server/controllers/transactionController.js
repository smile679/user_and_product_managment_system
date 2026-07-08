import Transaction from "../models/transaction.js";

export const getTransaction = async(req, res) => {
  
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;


    const skip = ( page - 1) * limit;
    
    const total = await Transaction.countDocuments();
    const transactions = await Transaction.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      message: "transaction successfully fetched!",
      data: transactions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something is wrong!",
    });
  }
}