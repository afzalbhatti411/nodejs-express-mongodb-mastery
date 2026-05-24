import express from "express";
const router = express.Router();

let users = [
    {id: 1, name: "ashgar"},
    {id: 2, name: "bhatti"},
]


// we attach our routes to "router" instead of "app"
// 2. Notice we can just use '/' and '/:id' because the prefix will be set in app.js!

router.get('/', (req, res)=>{
    res.json(users);
})


router.post('/', (req, res)=>{
    let newUser = {
        id : users.length +1,
        name: req.body.name
    }
    users.push(newUser);
    res.status(201).json({message: "new user added", user: newUser})
})

router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ message: "user not found" });
    user.name = req.body.name;
    res.json({ message: "user updated successfully" });
});


router.delete('/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ message: "user not found" });
    users = users.filter(u => u.id !== Number(req.params.id));
    res.json({ message: "user deleted successfully" });
});

export default router;