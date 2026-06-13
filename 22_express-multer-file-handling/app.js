import express from "express";
import multer from "multer";
import ejs from "ejs";

const app = express();
const port = 3000;

// helps to show js in html as embaded 
app.set("view engine", "ejs");

// tells multer to Express where to save files
const upload = multer({dest: "uploads/"});

// helps browser to show buttons etc 
app.get('/', (req, res)=>{
    res.render("index")
})

// triger ejs to upload files 
app.post("/upload", upload.single('myFile'), (req, res)=>{
    console.log(req.file)
    res.send("file saved locally")
})

app.listen(port, ()=>{
    console.log(`server is listening right now`)
})
