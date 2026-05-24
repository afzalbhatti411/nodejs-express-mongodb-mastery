import express from "express";
const app = express();
const port = 3000;

// middleware
app.use(express.json());

let users = [
    {id: 1, name: "ashgar"},
    {id: 2, name: "bhatti"},
]

// get route-to access all users
app.get('/api/users', (req, res)=>{
    res.json(users);
})

// post route-to add new user
app.post('/api/users', (req, res)=>{
    let newUser = {
        id : users.length +1,
        name: req.body.name
    }
    users.push(newUser);
    res.status(201).json({message: "new user added", user: newUser})
})

app.listen(port, ()=>{
    console.log(`server is listening from port : ${port}`)
})


































// import express from "express";
// const app = express();
// const port = 3000;

// // middleware-to tell express to accept data in json form
// app.use(express.json());

// // create Mock User Databas
// let users = [
//     {id: 1, name: "ali"},
//     {id: 2, name: "niya"},
// ]
// // create get route-to get all user data 
// app.get('/api/users', (req, res)=>{
//     res.json(users)
// })

// // post route-to add new user data
// app.post('/api/users', (req, res)=>{
//     const newUser = {
//         id : users.length + 1, 
//         name : req.body.name,
//     }
//     users.push(newUser);
//     res.status(201).json({message: "new user added", user: newUser})
// })
// // create server to listen 
// app.listen(port, ()=>{
//     console.log(`server is listening at the port # ${port}`)
// })

