import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder } from "../controllers/OrderControler.js"
 const  orderRouter = express.Router();


 orderRouter.post("/place",authMiddleware,placeOrder);
 export  default orderRouter;