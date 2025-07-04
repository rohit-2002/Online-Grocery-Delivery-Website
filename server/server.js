import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/Cloudinary.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import contactRoute from "./routes/contactRoute.js";
const app = express();
const port = process.env.PORT || 4000;

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://freshbasket-frontend-seven.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.get("/", (req, res) => res.send("API is Working"));

    app.use("/api/user", userRouter);
    app.use("/api/seller", sellerRouter);
    app.use("/api/product", productRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/address", addressRouter);
    app.use("/api/order", orderRouter);
    app.use("/api", contactRoute);
    app.listen(port, () =>
      console.log(`✅ Server running at: http://localhost:${port}`)
    );
  } catch (error) {
    console.error("❌ Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
