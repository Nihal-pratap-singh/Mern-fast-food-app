import express, { Router } from "express"
import authMiddleware from "../middleware/auth.js";
import { addToCart,romoveToCart,getCart } from "../controllers/cartControlles.js"


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)

cartRouter.post("/remove",authMiddleware,romoveToCart)

cartRouter.post("/get",authMiddleware,getCart)


export default cartRouter;