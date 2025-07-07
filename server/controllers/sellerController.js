import jwt from "jsonwebtoken";

// Seller Login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send secure cookie
      res.cookie("sellerToken", token, {
        httpOnly: true,
        sameSite: "lax", // ✅ Crucial for frontend to send cookies
        secure: process.env.NODE_ENV === "production", // false in localhost
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login error", error: error.message });
  }
};

// Auth Check
export const isSellerAuth = (req, res) => {
  return res.status(200).json({ success: true, seller: req.seller });
};

// Logout
export const sellerLogout = (req, res) => {
  res.clearCookie("sellerToken");
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
