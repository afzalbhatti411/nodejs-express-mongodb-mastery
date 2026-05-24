import express from "express";
const app = express();
const port = 3000;

// middleware-to tell express to accept data in json 
app.use(express.json());

// create our Mock Database
let users = [
    {id: 1, name: "afzal"},
    {id: 2, name: "bhatti"},
    {id: 3, name: "adeel"},
]

// get route-to get all suer data
app.get('/api/users', (req, res)=>{
    res.json(users);
})

// post route-to add new user data 
app.post('/api/users', (req, res)=>{
    const newUser = {
        id: users.length+1,
        name: req.body.name,
    }
    users.push(newUser);
    res.status(201).json({message: "a new user added", user: newUser});
})

// put route & delete route can be made identical and its a professional way. 

app.put('/api/users/:id', (req, res)=>{
    // find the target user
    const user = users.find(u=> u.id === Number(req.params.id));
    // if user is not available
    if(!user){
        return res.status(404).json({message: "user not found"});
    }
    user.name = req.body.name;
    res.json({message: "user udpated successfully"})
})

// delete route-to remove a user from data
app.delete('/api/users/:id', (req, res)=>{
    // find the target user
    const user = users.find(u=> u.id === Number(req.params.id));
    // if user is not available 
    if(!user){
        return res.status(404).json({message: "user not found"});
    }
    // delete the user from data
    users = users.filter(u=> u.id !== Number(req.params.id));
    res.json({message: "user deleted successfully"})
})

app.listen(port, ()=>{
    console.log('server is listening from port : 3000 ');
})
