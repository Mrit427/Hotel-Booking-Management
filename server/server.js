// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import userRouter from "./routes/userRoutes.js";
// import hotelRouter from "./routes/hotelRoutes.js"
// import connectCloudinary from './configs/cloudinary.js';
// import roomRouter from "./routes/roomRoutes.js";
// import User from "./models/user.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import dns from 'node:dns/promises';
// dns.setServers(["8.8.8.8","1.1.1.1"]);


// // Connect DB and Cloudinary
// connectDB();
// connectCloudinary();

// const app = express();
// app.use(cors());

// // FOOLPROOF RAW BODY PARSER:
// // It parses the JSON normally but also preserves the exact raw payload in req.rawBody
// app.use(express.json({
//   verify: (req, res, buf) => {
//     req.rawBody = buf;
//   }
// }));

// app.use(clerkMiddleware());

// // Clerk Webhook Endpoint (No special body parser needed here now)
// app.post("/api/clerk", clerkWebhooks);

// // API Routes
// app.get('/', (req, res) => res.send("API is working well"))
// app.use('/api/user', userRouter)
// app.use('/api/hotels', hotelRouter)
// app.use('/api/rooms', roomRouter)
// app.use('/api/bookings', bookingRouter)


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\n`);
//   console.log(`BACKEND SERVER RUNNING ON PORT: ${PORT}`);
//   console.log(`-----`);
// });

// export default app;




// server/server.js

// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDB from "./configs/db.js";
// import connectCloudinary from './configs/cloudinary.js';
// import dns from 'node:dns/promises';
// dns.setServers(["8.8.8.8","1.1.1.1"]);

// // Import Routers
// import userRouter from "./routes/userRoutes.js";
// import hotelRouter from "./routes/hotelRoutes.js";
// import roomRouter from "./routes/roomRoutes.js"; // <--- Ensure this is imported
// import bookingRouter from "./routes/bookingRoutes.js";
// import clerkWebhooks from "./controllers/clerkWebhooks.js";

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json({
//     verify: (req, res, buf) => { req.rawBody = buf; }
// }));

// // Route Mounting
// app.use('/api/user', userRouter);
// app.use('/api/hotels', hotelRouter);
// app.use('/api/rooms', roomRouter); // <--- CRITICAL: Must be plural '/api/rooms'
// app.use('/api/bookings', bookingRouter);

// app.post("/api/clerk", clerkWebhooks);

// // Connect to DB and Start
// connectDB();
// connectCloudinary();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import dns from 'node:dns/promises';
dns.setServers(["8.8.8.8","1.1.1.1"]);
// Routers Import
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js"; 
import paymentRouter from './routes/paymentRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import subRouter from './routes/subscriberRoutes.js';
import offerRouter from './routes/offerRoutes.js';

const app = express();
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf; 
    }
}));

app.use(cors());
app.use(clerkMiddleware());
// app.use(express.json());
app.post("/api/clerk", clerkWebhooks); 
// Routes Setup
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter); 
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/subscribe', subRouter);
app.use('/api/offers', offerRouter);


connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));