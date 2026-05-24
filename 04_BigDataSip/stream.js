const fs = require('fs');
const path = require('path');

const folderName = "myfolder";
const fileName = "myFile.txt";
const largeText= "In the name of Allah, the most benifient, the merciful";

const filePath = path.join(folderName, fileName);

// create a folder 
if(!fs.existsSync(folderName)){
    fs.mkdirSync(folderName);
}

// create file with large text inside it
fs.writeFileSync(filePath, largeText);

// create a strem 
const reader = fs.createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 10,
})

let chunkCount = 0;

// listen for small Data sips 
reader.on('data', (chunk)=>{
    chunkCount++;
    console.log(`chunk # ${chunkCount} received : ${chunk}`);
})

// listen for end of data 
reader.on('end', ()=>{
    console.log(`data finished! total no of data processed : ${chunkCount}`);
})

