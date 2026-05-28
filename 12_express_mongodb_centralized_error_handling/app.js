import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import { Timestamp } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(`monog db connected successfully`))
.catch((err)=>console.error(`connection with mongodb failed`));

app.use(express.json());

app.use('/api/users', userRoutes);

// global error handling
app.use((err, req, res, next)=>{

    console.error(`error caught`, err.message);
    const statuscode =  err.status || 500;

    res.status(statuscode).json({
        success: false, 
        status: statuscode, 
        error: err.message || "internal server error",
        Timestamp: new Date().toISOString()
    })
})

app.listen(port, ()=>{
    console.log(`server is listening`)
})
