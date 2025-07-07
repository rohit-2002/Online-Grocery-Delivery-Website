import User from "../models/User.js";

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId; // ✅ Use from authUser middleware

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log("Cart update error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
