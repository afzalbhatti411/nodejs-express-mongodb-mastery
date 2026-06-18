import express from "express";
import ejs from "ejs";
import multer from "multer";

const app = express();
const port = 3000;

// helps html to show js
app.set("view engine", "ejs");

// public folder
app.use('/public-images', express.static('uploads'));

// how to save files
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

// where to save files
const upload = multer({storage});

// to view ejs file on browser 
app.get('/', (req, res)=>{
    res.render("index")
})

// to upload files
app.post('/upload', upload.single('myFile'), (req, res)=>{

    const savedName = req.file.filename;
    res.render("viewer", {filename: savedName})
})

app.listen(port, ()=>{
    console.log(`server is listening at port: ${port}`)
})