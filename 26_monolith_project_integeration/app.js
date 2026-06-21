import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import fs from "fs";
import Post from "./models/Post.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
const port = 3000;

// App engine and Middleware 
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/blog-images', express.static("uploads"))

// automatically create uploads folder if not exist
if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads")
}

// connection with mongodb
mongoose.connect("mongodb://127.0.0.1:27017/devBlogDB")
.then(()=>console.log(`connection with mongodb successfull`))
.catch((err)=>console.error(`connection with mongodb failed`, err))

// multer configuration 
const storage = multer.diskStorage({
    destination: (req, file, cb)=> cb(null, "uploads/"),
    filename: (req, file, cb)=> cb(null, `${Date.now()}_${file.originalname}`)
})

const upload = multer({
    storage: storage, 
    limits: {fileSize: 3*1024*1024},
    fileFilter: (req, file, cb)=>{
        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if(allowedMimeTypes.includes(file.mimetype)){
            cb(null, true)
        } else{
            cb(new Error(`validation failed. only .png, .jpeg, .jpg fomrats are allowed`))
        }
    }
});

// 🌐 ROUTE 1: Public Homepage (Fetch and read posts directly from MongoDB)
app.get('/', async (req, res)=>{
    try{
        // fetch all posts from home page
        const allPosts =  await Post.find().sort({createdAt: -1});
        res.render("index", {posts : allPosts})
    }catch(err){
        res.status(500).send("Error Loading Homepage");
    }
})

// Route 2: Admin Creation Layout page
app.get("/admin/create", (req, res)=>{
    res.render("create", {errorMessage: null})
})

// Route 3: Handle Post submission form (saving data in mongodb)
app.post('/admin/create', (req, res)=>{
    upload.single('blogBanner')(req, res, async (err)=>{
        if(err){
            return res.render('create', {errorMessage: err.message})
        }
        try{
            await Post.create({
                title: req.body.title, 
                content: req.body.content, 
                imageName: req.file? req.file.filename: null
            })
            // redirect to homepage to view new post
            res.redirect('/')

        }catch(dbErr){
            res.render("create", {errorMessage: dbErr.message})
        }
    })
})

// listen to server
app.listen(port, ()=>{
    console.log(`server is listening at the port: http://localhost:${port}`)
})


