import express from "express";
import session from "express-session";

const app = express();
const port = 3005;

// create ejs middleware
app.set("view engine", "ejs");

// session middleware
app.use(session({
    secret: "your secret key to sign in cookies",
    resave: false,
    saveUninitialized: false
}))

// login route
app.get('/login', (req, res)=>{
    req.session.username = "zainsecure";
    res.send(`STEP 1:Server has created a session/sent cookies to your browser`)
})

// profile login 

app.get('/profile', (req, res)=>{
    if(req.session.username){
        // res.send = res.render
        res.render("index", {username: "zain"})
    } else{
        res.status(401).send(`step2b: failure. access denied`)
    }
})


app.listen(port, ()=>{
    console.log(`server is listening very carefully now`)
})











































// import express from "express";
// import session from "express-session";

// const app = express();

// //make ejs as default html template compiler
// app.set('view engine', "ejs"); 

// // create session middleware
// app.use(session({
//     secret: "secret key to sign cookie",
//     resave: false, 
//     saveUninitialized: false
// }))

// // login route
// app.use('/login', (req, res)=>{
//     req.session.username = "zainsecurity";
//     res.send(`STEP 1: server created a session/sent cookie to your browser`)
// })

// // profile route
// app.use('/profile', (req, res)=>{
//     if(req.session.username){
//         // res.send = res.render 
//         res.render('index', {userProfileName : req.session.username})
//     } else{
//         res.status(401).send(`STEP2B: Access denied. server did not send a valid session cookie`)
//     }
// })

// app.listen(3006, ()=>{
//     console.log(`server is listening now`)
// })

