import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import authRoutes from "./routes/authRoutes.js"

// import all routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { Timestamp } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// mongodb connection 
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected with mongodb successfully'))
.catch((err)=>console.error('connection with mongodb failed'));

// routes connection maping 
app.use('/api/users', userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/auth', authRoutes);

// landing route sanity check
app.get('/', (req, res)=>{
    res.status(200).json({message: "Relational API Gateway Active"})
})

// global error handling 
app.use((err, req, res, next)=>{
    console.error(`error caught`, err.message);
    const status = err.status || 500;

    res.status(status).json({
        success : false, 
        status: status, 
        error : err.message || "server internal error",
        Timestamp: new Date().toISOString(), 
    })
})

app.listen(port, ()=>{
    console.log('server is listening now')
})
