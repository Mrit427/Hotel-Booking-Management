import express from "express";
import { addSubscriber } from "../controllers/subscriberControllers.js";

const subRouter = express.Router();

// The path is '/' because it's combined with '/api/subscribe' in server.js
subRouter.post("/", addSubscriber);

export default subRouter;