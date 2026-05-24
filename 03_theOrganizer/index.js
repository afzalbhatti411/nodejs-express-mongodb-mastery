const fs = require('fs');
const path = require('path');

// required folder & file names & required text
const folderName = "MyLogFolder";
const fileName = "myLog.txt";
const requiredText = "In the name of allah, the most benificent, the merciful";

// create folder 
if(!fs.existsSync(folderName)){
    fs.mkdirSync(folderName);
    console.log('folder created successfully');
}

// create path for required file
const filePath = path.join(folderName, fileName);

// create file now with text 
fs.writeFileSync(filePath, requiredText);
console.log('file created succeffully');
