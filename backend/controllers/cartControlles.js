import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId comes from authMiddleware

        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cart if not present
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error("Error in addToCart:", error.message); // Log specific error message
        res.status(500).json({ success: false, message: "Internal server error" }); // Generic error for client
    }
};

//remove items form user cart

const romoveToCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})

    }
}

// fetch user card data

const getCart = async (req, res) => {
 try { 
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
 }
 
 }

export { addToCart, getCart, romoveToCart }