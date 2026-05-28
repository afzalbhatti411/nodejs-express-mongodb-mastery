import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`🚀 mongodb connected successfully via MVC architecture`))
    .catch((err) => console.error(`❌ Connection failed`, err));



// Routes Integration
app.use('/api/users', userRoutes);

// 🚨 CENTRALIZED GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(`error caught:`, err.message);
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        error: err.message || "internal server error",
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});