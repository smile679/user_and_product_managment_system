import mongoose from "mongoose";


  const userSchema = mongoose.Schema(
    {
      fullName: {
        type: String,
        required: [true, "please add your fullname"],
      },
      email: {
        type: String,
        required: [true, "please add your email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "please add your password"],
      },
    },
    { timestamps: true },
  );

 const User = mongoose.model("User", userSchema);
 export default User;