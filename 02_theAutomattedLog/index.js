const fs = require('fs');
const os = require('os');

const user = os.userInfo().username;
const platformName = os.platform();

const content = `log entry for ${user} : This computer is running on platform : ${platformName}.`;

// create a file with text in it
fs.writeFileSync("myLog.txt", content);

console.log('file created successfully');
