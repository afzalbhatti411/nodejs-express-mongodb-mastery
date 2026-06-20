import express from "express";
import cookieParser from "cookie-parser";


const app = express();
const port = 3000;

// middleware
app.use(cookieParser());


// Route A: read cookies sent by the browser
app.get('/', (req, res)=>{
    console.log('my current brower cookies: ', req.cookies);
    res.send('welcome back to the sever')
})

// Route B: Force server to drop a new cookie
app.get('/set-cookie', (req, res)=>{
    res.cookie("userMode", "Dark_Theme");
    res.cookie("isLoggedIn", true);

    res.send()
})

app.listen(port, ()=>{
    console.log('my Server Is Linstening')
})







































// import express from "express";
// import cookieParser from "cookie-parser";

// const app = express();
// const port = 3000;

// // middleware
// app.use(cookieParser());

// // Route A: read cookies sent by the browser
// app.get('/', (req, res)=>{
//     console.log("current browser cookies: ", req.cookies);
//     res.send("welcome back to the server")
// })

// // Route B: Force the server to drop a new cookie
// app.get('/set-cookie', (req, res)=>{
//     res.cookie('userMode', "Dark_theme");
//     res.cookie('isLoggedIn', true);

//     res.send();
// })

// app.listen(port, ()=>{
//     console.log("port is listening now");
// })
