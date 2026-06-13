import express from "express";
import multer from "multer";

const app = express();
const port = 3000;

// helps html to show js
app.set("view engine", "ejs");

// how to save files 
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`) //date/time is added so now file can have duplicate name
    }
})

// where to save files 
const upload = multer({storage})

// show index file data 
app.get('/', (req, res)=>{
    res.render("index")
})

// helps express to upload files 
app.post('/upload', upload.single('myFile'), (req, res)=>{
    console.log(req.file);
    res.send("file saved locally")
})

app.listen(port, ()=>{
    console.log(`server is listening now`)
})

