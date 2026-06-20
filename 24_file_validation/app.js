import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use("/public-images/", express.static("uploads"));

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// 🔒 THE NEW STEP: Adding Validation Constraints to Multer
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 2 * 1024 * 1024 // 1. Limit file size to exactly 2MB (in bytes)
    },
    fileFilter: (req, file, cb) => {
        // 2. Define your list of strictly allowed file formats
        const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Safe file format! Pass it through.
        } else {
            // Unsafe file format! Abort the upload and pass an error
            cb(new Error("Validation Failed: Only .png, .jpg, and .jpeg formats are allowed!"), false);
        }
    }
});

app.get('/', (req, res) => {
    res.render("index");
});

// 🛡️ Error Handling Route Controller
app.post('/upload', (req, res) => {
    // We execute our upload handler manually here to elegantly catch validation errors
    upload.single('myFile')(req, res, (err) => {
        if (err) {
            // If the file was too large or the wrong format, catch the error here!
            return res.status(400).send(`❌ Upload Blocked: ${err.message}`);
        }
        
        // If everything passes validation safely:
        const savedName = req.file.filename;
        res.render("viewer", { filename: savedName });
    });
});

app.listen(port, () => console.log(`Secure server running on port ${port}`));