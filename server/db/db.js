import mongoose from "mongoose"

const connectDb = async() => {
  try {
    const MONGOOSE_URI = process.env.MONGOOSE_URI;

   await mongoose.connect(MONGOOSE_URI);
      console.log("Mongoose successfully connected!");
  } catch (e) {
    console.error(e);
    console.log("mongoose failed to connect!");
  }
};


export default connectDb;