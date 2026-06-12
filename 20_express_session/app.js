import express from "express";
import session from "express-session";

const app = express();

// create session middleware
app.use(session({
    secret: "secret key to sign cookie",
    resave: false, 
    saveUninitialized: false
}))

// login route
app.use('/login', (req, res)=>{
    req.session.username = "zainsecurity";
    res.send(`STEP 1: server created a session/sent cookie to your browser`)
})

// profile route
app.use('/profile', (req, res)=>{
    if(req.session.username){
        res.send(`STEP2A: Success! welcome back`)
    } else{
        res.status(401).send(`STEP2B: Access denied. server did not send a valid session cookie`)
    }
})

app.listen(3008, ()=>{
    console.log(`server is listening now`)
})












































// import express from "express";
// import session from "express-session"

// const app = express();

// // session middleware
// app.use(session({
//     secret: "secret key to sign cookies",
//     resave: false, 
//     saveUninitialized: false
// }))

// // login route
// app.use('/login', (req, res)=>{
//     req.session.username = "zainsecurity";
//     res.send(`step 1: server created a session and has sent cookies to your browser`)
// })

// // profile route
// app.use('/profile', (req, res)=>{
//     if(req.session.username){
//         res.send(`step 2a: success! welcome back`)
//     } else{
//         res.status(401).send(`step 2b: Access denied. your server did not provide a valid session cookie`)
//     }
// })

// app.listen(3006, ()=>{
//     console.log("server is listening now")
// })
