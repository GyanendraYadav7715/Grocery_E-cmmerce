import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectiontoMogodbcluster from "./configuration/database.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Import routes


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Allow multiple frontend origins
const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// ✅ Connect to MongoDB
await connectiontoMogodbcluster();

app.use("/api/user/",userRoutes)
// Sample route
app.get("/", (req, res) => {
    res.send("Hello from server!");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
