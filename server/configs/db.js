import mongoose from "mongoose";

const connectDB = async ()=>{
 try {
   mongoose.connection.on('connected', () => console.log("Database Connected"));
   
   // Connect directly using .env URI to avoid connection string syntax errors
   await mongoose.connect(process.env.MONGODB_URI);
 } catch (error) {
   console.log("Database connection error:", error.message);
 }
}

export default connectDB;