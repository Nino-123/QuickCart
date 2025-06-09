import mongoose from "mongoose";
import User from "@/models/User";
import "dotenv/config";

async function updateUserRole(userId, newRole) {
  await mongoose.connect(process.env.MONGODB_URI + "/quickcart");
  const user = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true }
  );
  console.log("Updated user:", user);
  await mongoose.disconnect();
}

// Replace with your Clerk userId and desired role
updateUserRole("user_2yGNXbqQFl9PmpSGWqBJju4U5lN", "seller");