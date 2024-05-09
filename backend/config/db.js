import mongoose from "mongoose";



export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://fastfood:fastfood7428@cluster0.8u0wxeu.mongodb.net/fastfood').then(()=>console.log(" db connected"));
}