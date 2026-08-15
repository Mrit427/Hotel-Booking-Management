// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { getUserData, storeRecentSearchedCities } from "../controllers/userControllers.js";

// const userRouter = express.Router();

// userRouter.get('/', protect, getUserData);
// userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);
 
 
// export default userRouter;




import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRecentSearchedCities } from "../controllers/userControllers.js";

const userRouter = express.Router();

// Route: GET /api/user/
userRouter.get('/', protect, getUserData);

// Route: POST /api/user/store-recent-search
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);

export default userRouter;