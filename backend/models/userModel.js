import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object } // Remove the default value or adjust it as needed
}, { minimize: false });

const userModel = mongoose.model("User", userSchema); // Use "User" as the model name
export default userModel; // Export the model, not the schema
