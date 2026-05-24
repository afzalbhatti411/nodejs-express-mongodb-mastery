import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = 3000;

// middleware 
app.use(express.json());

// tell express: every request coming from /api/users to use usersRoutes.  
app.use('/api/users', userRoutes);

app.listen(port, ()=>{
    console.log('server is listening now')
})






















// import express from "express";
// import userRoutes from "./routes/userRoutes.js"

// const app = express();
// const port = 3000;

// // middleware
// app.use(express.json());

// // tell express: every request coming from /api/users should use userRoutes
// app.use('/api/users', userRoutes);

// app.listen(port, ()=>{
//     console.log(`server is listening from port : ${port}`)
// })

