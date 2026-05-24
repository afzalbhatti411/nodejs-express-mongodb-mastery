import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
const port = process.env.PORT || 3000;


// securely connect with mongoDB Connection using the hidden environment variable 
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('successfully connected with MongoDB'))
.catch((err)=> console.error('failed to connect with mongodb', err));

// middleware 
app.use(express.json());

// connection with route folder 
app.use('/api/users', userRoutes);

app.listen(port, ()=>{
    console.log('server is listening noew');
})