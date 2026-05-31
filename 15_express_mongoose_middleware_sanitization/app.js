import "dotenv/config";
import express from "express";
import { Timestamp } from "mongodb";
import mongoose from "mongoose";

// import all routes 
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"

const app=express();
const port = process.env.PORT || 3000;

// Connection with mongoodb

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("server connected with mongodb successfully"))
.catch((err)=>console.error("connnection with mongodb failed"))

// middleware
app.use(express.json());

// routes connection
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// global error handling 

app.use((err, req, res, next)=>{
    console.error(`error intercepted`, err.message)
    const status = err.status || 500;

    res.status(status).json({
        success : false, 
        status: status, 
        error : err.message || "internal server error"    ,
        Timestamp: new Date().toISOString()
    })
})

app.listen(port, ()=>{
    console.log(`server is listening now`)
})