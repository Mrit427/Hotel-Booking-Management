import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js"
// import connectCloudinary from "./configs/cloudinary.JS";
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from "./routes/roomRoutes.js";
import User from "./models/User.js"; 

connectDB()
connectCloudinary()

const app = express()
app.use(cors())


//Middleware
// app.use("/api/clerk",express.json())
// app.use(clerkMiddleware())

// API to listen to clerkWebhooks
// app.use("/api/clerk", express.raw({ type: "application/json" }));
// app.post("/api/clerk", clerkWebhooks);
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("API is working well"))




app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)


// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app; 