const os = require('os');
const user = os.userInfo().username;
const upTime = os.uptime();
const totalMem = os.totalmem();


console.log(`
    hi.....${user},
    your system is running we.e.f ${upTime} seconds,
    your system total memory is = ${totalMem} bytes.
    ..............................
    `)
