import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; // ✅ Import CORS

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());

// ✅ Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// API Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
